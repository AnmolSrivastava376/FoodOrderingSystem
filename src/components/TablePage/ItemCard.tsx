import { Item } from "@/lib/models/item";
import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ItemCardProps {
    items: Item[];
}

const ItemCard: React.FC<ItemCardProps> = ({ items }) => {
    const HandleClick = (id: number) => {
        const i = expanded.indexOf(id);
        if (i === -1) {
            const temp = [...expanded];
            temp.push(id);
            setExpanded(temp);
        } else {
            const temp = [...expanded];
            temp.splice(i, 1);
            setExpanded(temp);
        }
    };
    const [expanded, setExpanded] = useState<number[]>([]);

    return (
        <div className="flex px-4 gap-4 flex-col">
            {items.map((item: Item) => (
                item.is_available && (
                    <div
                        key={item.id}
                        className={`w-full ${expanded.indexOf(item.id) !== -1 ? "h-[200px]" : "h-[160px]"
                            } relative transition-all duration-[500ms] flex justify-between pt-[10px]`}
                    >
                        <div className="w-auto h-full flex flex-col">
                            <div className="flex gap-[6px] items-center">
                                <div
                                    className="w-[18px] h-[18px] relative"
                                    style={{
                                        backgroundImage: `url(${item.is_veg ? "veg.png" : "/nonveg.png"
                                            })`,
                                        backgroundSize: "100% 100%",
                                    }}
                                ></div>
                                {item.is_recommended && (
                                    <div className="text-[10px] font-bold bg-[#a2630e] text-white flex items-center justify-center px-[4px] h-[16px] leading-[12px] rounded-[6px]">
                                        Recommended
                                    </div>
                                )}
                            </div>
                            <div className="font-[800] text-[18px] leading-[24px] pt-1">
                                {item.name}
                            </div>
                            <div className="text-[14px] font-[700] flex items-center py-[6px]">
                                <span className="leading-[16px]">&#x20B9;{item.price}</span>
                            </div>
                            <div className="flex items-center justify-center w-fit gap-[4px] bg-[#38751f] px-[6px] py-[4px] rounded-[6px]">
                                <FaClock fontSize={"10px"} color="white" />
                                <div className="font-[700] text-[12px] text-white leading-[12px] tracking-wider">
                                    {item.estimated_time}
                                </div>
                            </div>
                            <div
                                className="w-fit h-[16px] mt-2 py-[10px] pl-[8px] pr-[4px] text-[rgb(0,0,0,0.6)] border-[1.5px] border-[rgb(0,0,0,0.4)] rounded-[8px] font-[700] text-[12px] flex items-center justify-center gap-[2px]"
                                onClick={() => { HandleClick(item.id) }}
                            >
                                {expanded.indexOf(item.id) !== -1 ? "Less Details" : "More Details"}
                                <div
                                    className={`flex text-[rgb(0,0,0,0.6)] mt-[2px] items-center transition-all duration-[500ms] justify-center ${expanded.indexOf(item.id) !== -1 && "rotate-180"
                                        }`}
                                >
                                    <MdKeyboardArrowDown fontSize={"14px"} />
                                </div>
                            </div>
                            <div
                                className={`max-w-[200px] overflow-hidden text-[12px] font-[700] italic text-gray-400 pt-[6px] ${expanded.indexOf(item.id) !== -1 ? "h-[60px] delay-500" : "h-[0] delay-0"
                                    }`}
                            >
                                {item.description}
                            </div>
                        </div>
                        <div
                            className="relative w-[140px] h-[130px] rounded-[12px] flex justify-center"
                            style={{
                                backgroundImage: `url(${item.image_url})`,
                                backgroundSize: "100% 100%",
                                backgroundPosition: "center",
                            }}
                        >
                            <div
                                style={{ boxShadow: "-5px -5px 5px rgb(0,0,0,0.3)" }}
                                className="absolute bottom-[-12px] cursor-pointer text-[#a2630e] border bg-[#f7e8d1] w-[100px] rounded-[10px] h-[35px] flex items-center justify-center"
                            >
                                <span
                                    className="text-[14px] font-[600]"
                                    onClick={() => {
                                        // HandleClick(item.id);
                                    }}
                                >
                                    Add Item
                                </span>
                            </div>
                        </div>
                        <div
                            className="absolute w-full h-[0.25px] bottom-[-8px]"
                            style={{ background: "#ded6cd" }}
                        ></div>
                    </div>)
            ))}
        </div>
    );
};

export default ItemCard;