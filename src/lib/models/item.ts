export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    is_available: boolean;
    is_veg: boolean;
    image_url: string;
    estimated_time: string;
    is_recommended: boolean;
    tags: string[];
}
