export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    is_available: boolean;
    is_veg: boolean;
    image_url: string;
    tags: string;
}
// export const insertItemSQL = `
//     INSERT INTO items (name, description, price, is_available, is_veg, image_url, tags)
//     VALUES ('Sample Item', 'This is a sample description', 9.99, true, true, 'http://example.com/image.jpg', 'sample,example');
// `;