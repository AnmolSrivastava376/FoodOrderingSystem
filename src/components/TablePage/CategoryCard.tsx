import React from 'react';
import { Category } from '@/lib/models/category';

interface CategoryCardProps {
    categories: Category[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categories }) => {
    return (
        <div className='flex gap-[12px] overflow-scroll justify-start'>
            {categories.map((category: Category) => (
                <div
                    key={category.id}
                    className="flex relative flex-col gap-2 bg-gray-200 min-w-[150px] h-[120px] text-wrap rounded-xl"
                    style={{
                        backgroundImage: `url(${category.image_url})`,
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                    }}
                >
                    <div className='absolute px-[12px] text-right rounded-[4px] flex items-center justify-center right-[-6px] top-[10px] min-w-[60px] text-wrap max-w-[120px] w-fit min-h-[20px] h-fit bg-[#a2630e] text-white font-bold'>{category.name}</div>
                </div>
            ))}
        </div>
    );
};

export default CategoryCard;