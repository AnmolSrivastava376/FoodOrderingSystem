import { Category } from "../models/category";

const categoryService = {
    async fetchAllCategories(): Promise<Category[]> {
        const response = await fetch('/api/categories');
        if (!response.ok) 
            throw new Error('Failed to fetch categories');
        
        return response.json() as Promise<Category[]>;
    }
};

export default categoryService;