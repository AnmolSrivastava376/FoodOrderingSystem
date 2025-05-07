import React, { useState, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import { IoSearch } from 'react-icons/io5';
import { FaShoppingCart } from "react-icons/fa";
import SectionHeader from './SectionHeader';
import { useRealtimeTable } from '@/lib/hooks/useRealtimeTable';
import { Item } from '@/lib/models/item';
import ItemCard from './ItemCard';
import itemsService from "@/lib/service/itemService";
import { Category } from '@/lib/models/category';
import categoryService from '@/lib/service/categoryService';
import CategoryCard from './CategoryCard';

interface TableHomePageProps {
  tablenumber: number;
}

const TableHomePage: React.FC<TableHomePageProps> = ({ tablenumber }) => {
  const items = useRealtimeTable<Item>({
    table: 'items',
    fetchService: itemsService.fetchAllItems,
  });

  const categories = useRealtimeTable<Category>({
    table: 'category',
    fetchService: categoryService.fetchAllCategories,
  });

  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const cartDropRef = useRef<HTMLDivElement>(null);

  const handleDropItem = (item: Item) => {
    setCartItems(prev => [...prev, item]);
  };

  return (
    <div className='w-full h-full flex flex-col items-center bg-white max-w-[450px] overflow-x-hidden relative'>
      <Navbar tablenumber={tablenumber} />

      {/* SearchBar */}
      <div className='w-full flex items-center justify-center mx-4'>
        <div className="flex w-full h-[36px] items-center border border-[#a2630b] mx-[12px] my-[6px] rounded-[10px]">
          <div className="px-[6px] search-icon relative h-[80%] flex items-center">
            <IoSearch fontSize={"18px"} color={"#4b3619"} />
          </div>
          <div className="italic text-[14px] pl-[6px]">Search</div>
        </div>
      </div>

      {/* Categories */}
      <SectionHeader HeaderText="Categories" />
      <div className='w-full relative max-w-[450px] min-h-[130px] px-4 flex justify-start items-center'>
        <CategoryCard categories={categories} />
      </div>

      {/* Items */}
      <SectionHeader HeaderText="Explore" />
      <ItemCard items={items} dropZoneRef={cartDropRef} onDropItem={handleDropItem} setIsDragging={setIsDragging} />


      {/* Cart / Drop Zone */}
      {/* If is in dropzone (IsInDropZone) use dropZoneref.current.style to change css */}
      <div
        ref={cartDropRef}
        className='w-[70px] h-[70px] bg-[#fdd8a3] border-[#a2630b] border-[1.5px] rounded-full flex items-center justify-center fixed bottom-[40px] right-[32px]'
      >
        <FaShoppingCart fontSize={"30px"} color={"#a2630b"} />
        {cartItems.length > 0 &&
          <div className='absolute w-[24px] h-[24px] bg-[#38751f] rounded-full flex items-center justify-center text-white font-bold text-[12px] top-[-5px] right-[0px]'>
            <div>{cartItems.length}</div>
          </div>
        }
      </div>
    </div>
  );
};

export default TableHomePage;