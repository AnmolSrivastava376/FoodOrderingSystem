import { supabase } from '../supabase/supabase';
import { Item } from '../models/item';
import { useEffect, useState } from 'react';
import { fetchAllItems } from '../service/itemService';

export function subscribeToItems() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchAllItems()
            .then(setItems)
            .catch((error) => console.error('Error fetching items:', error));
    },[])

    useEffect(() => {
        const subscription = supabase
            .channel('realtime-items')
            .on(
                'postgres_changes', 
                { event: '*', schema: 'public', table: 'items' },
                (payload) => {
                    const event = payload.eventType;
                    if(event === 'INSERT'){
                        setItems((prevItems) => [...prevItems, payload.new as Item]);
                    }
                    else if(event === 'UPDATE'){
                        setItems((prevItems) => {
                            const index = 
                                prevItems.findIndex(item => 
                                    item.id === (payload.new as Item).id);
                            if(index !== -1){
                                const updatedItems = [...prevItems];
                                updatedItems[index] = payload.new as Item;
                                return updatedItems;
                            }
                            return prevItems;
                        });
                    }
                    else if(event === 'DELETE'){
                        setItems((prevItems) => 
                            prevItems.filter(item => item.id !== (payload.old as Item).id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return items;
}