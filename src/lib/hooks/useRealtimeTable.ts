import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

type SupabaseEvent = 'INSERT' | 'UPDATE' | 'DELETE';

interface Options<T> {
    table: string;
    schema?: string;
    filter?: (item: T) => boolean;
}

export function useRealtimeTable<T = any>({table,schema='public',filter}:Options<T>){
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const { data: initialData, error } = await supabase
                .from(table)
                .select('*')

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            if (!error && mounted) {
                const filteredData = filter ? initialData.filter(filter) : initialData;
                setData(filteredData as T[]);
            }
        }

        fetchData();

        return () => {
            mounted = false;
        };
    },[table, filter]);

    useEffect(() => {
        const channel = supabase
            .channel(`realtime:${schema}:${table}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema,
                    table,
                },
                (payload) => {
                    const event = payload.eventType as SupabaseEvent;

                    setData((prevData) => {
                        const newItem = payload.new as T;
                        const oldItem = payload.old as T;
                        switch(event) {
                            case 'INSERT':
                                if(filter && !filter(newItem)) {
                                    return prevData;
                                }
                                const alreadyExists = prevData.some((item) =>
                                    (item as any).id === (newItem as any)?.id
                                );
                                if (alreadyExists) 
                                    return prevData;
                                return [...prevData, newItem];
                            case 'UPDATE':
                                if(filter && !filter(newItem)) {
                                    return prevData.filter((item) => 
                                        (item as any).id !== (oldItem as any)?.id);
                                }
                                return prevData.map((item) => 
                                    (item as any).id === (newItem as any)?.id ? newItem : item
                                );
                            case 'DELETE':
                                return prevData.filter((item) => 
                                    (item as any).id !== (oldItem as any)?.id);
                            default:    
                                return prevData;
                        }
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [table,schema,filter]);

    return data;
}