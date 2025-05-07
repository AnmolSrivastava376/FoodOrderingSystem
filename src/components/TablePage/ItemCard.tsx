import { Item } from "@/lib/models/item";
import React, { useState, useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ItemCardProps {
  items: Item[];
  dropZoneRef: React.RefObject<HTMLDivElement | null>;
  onDropItem: (item: Item) => void;
  setIsDragging: (dragging: boolean) => void; // ✅ Added prop
}

const ItemCard: React.FC<ItemCardProps> = ({
  items,
  dropZoneRef,
  onDropItem,
  setIsDragging,
}) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (draggingItem) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [draggingItem]);

  const handleExpandToggle = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleTouchStart = (e: React.TouchEvent, item: Item) => {
    dragTimeout.current = setTimeout(() => {
      const touch = e.touches[0];
      setDraggingItem(item);
      setDragPos({ x: touch.clientX, y: touch.clientY });
      setIsDragging(true); // ✅ Inform parent drag started
    }, 200);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggingItem) {
      const touch = e.touches[0];
      setDragPos({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    if (dragTimeout.current) clearTimeout(dragTimeout.current);

    if (draggingItem && dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const isInDropZone =
        dragPos.y > rect.top &&
        dragPos.y < rect.bottom &&
        dragPos.x > rect.left &&
        dragPos.x < rect.right;

      if (isInDropZone) {
        onDropItem(draggingItem);
      }
    }

    setDraggingItem(null);
    setIsDragging(false); // ✅ Inform parent drag ended
  };

  return (
    <div
      className="flex px-4 gap-4 flex-col w-full max-w-[450px]"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {items.map(
        (item) =>
          item.is_available && (
            <div
              key={item.id}
              className={`w-full ${
                expanded.includes(item.id) ? "h-[200px]" : "h-[160px]"
              } relative transition-all duration-500 flex justify-between pt-[10px]`}
            >
              {/* Left info column */}
              <div className="w-auto h-full flex flex-col">
                <div className="flex gap-1.5 items-center">
                  <div
                    className="w-[18px] h-[18px] bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${item.is_veg ? "veg.png" : "/nonveg.png"})`,
                    }}
                  ></div>
                  {item.is_recommended && (
                    <div className="text-[10px] font-bold bg-[#a2630e] text-white flex items-center justify-center px-1 h-[16px] leading-[12px] rounded-[6px]">
                      Recommended
                    </div>
                  )}
                </div>

                <div className="font-extrabold text-[18px] leading-[24px] pt-1">
                  {item.name}
                </div>

                <div className="text-[14px] font-bold flex items-center py-1.5">
                  <span className="leading-[16px]">&#x20B9;{item.price}</span>
                </div>

                <div className="flex items-center justify-center w-fit gap-1 bg-[#38751f] px-1.5 py-1 rounded-[6px]">
                  <FaClock fontSize="10px" color="white" />
                  <div className="font-bold text-[12px] text-white leading-[12px] tracking-wider">
                    {item.estimated_time}
                  </div>
                </div>

                <div
                  className="w-fit h-[16px] mt-2 py-2.5 pl-2 pr-1 text-black/60 border border-black/40 rounded-[8px] font-bold text-[12px] flex items-center justify-center gap-[2px]"
                  onClick={() => handleExpandToggle(item.id)}
                >
                  {expanded.includes(item.id) ? "Less Details" : "More Details"}
                  <div
                    className={`flex mt-[2px] items-center transition-transform duration-500 justify-center ${
                      expanded.includes(item.id) && "rotate-180"
                    }`}
                  >
                    <MdKeyboardArrowDown fontSize="14px" />
                  </div>
                </div>

                <div
                  className={`max-w-[200px] overflow-hidden text-[12px] font-bold italic text-gray-400 pt-1.5 ${
                    expanded.includes(item.id) ? "h-[60px] delay-500" : "h-0 delay-0"
                  }`}
                >
                  {item.description}
                </div>
              </div>

              {/* Right image column (draggable) */}
              <div
                onTouchStart={(e) => handleTouchStart(e, item)}
                className="relative w-[140px] h-[130px] rounded-[12px] flex justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image_url})` }}
              >
                <div className="absolute bottom-[-12px] cursor-pointer text-[#a2630e] border bg-[#f7e8d1] w-[100px] rounded-[10px] h-[35px] flex items-center justify-center shadow-inner">
                  <span className="text-[14px] font-semibold">Add Item</span>
                </div>
              </div>

              <div className="absolute w-full h-[0.25px] bottom-[-8px] bg-[#ded6cd]"></div>
            </div>
          )
      )}

      {/* Floating drag copy */}
      {draggingItem && (
        <div
          className="fixed w-[180px] bg-white border border-black rounded p-2 z-[999] shadow-lg pointer-events-none"
          style={{
            top: dragPos.y - 30,
            left: dragPos.x - 90,
          }}
        >
          <div className="text-[14px] font-bold">{draggingItem.name}</div>
          <div className="text-[12px] text-gray-500">
            &#x20B9;{draggingItem.price}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
