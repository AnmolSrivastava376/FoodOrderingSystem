import { Item } from "../models/item";

const itemService = {
    async fetchAllItems(): Promise<Item[]> {
        const response = await fetch('/api/items');
        if (!response.ok) 
            throw new Error('Failed to fetch items');
        
        return response.json() as Promise<Item[]>;
    },

    async fetchItemById(id: number): Promise<Item> {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) 
            throw new Error(`Failed to fetch item with id ${id}`);
        
        return response.json() as Promise<Item>;
    }
};

export default itemService;