import { supabase } from '../supabase/supabase';
import { Item } from '../models/item';

export const fetchAllItems = async (): Promise<Item[]> => {
    try {
        const { data, error } = await supabase.from('items').select('*');
        if (error) {
            throw error;
        }
        return data as Item[];
    } catch (err) {
        console.error('Error fetching items:', err);
        throw err;
    }
};
