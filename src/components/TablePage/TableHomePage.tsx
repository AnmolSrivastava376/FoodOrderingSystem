import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { useRealtimeTable } from "@/lib/hooks/useRealtimeTable";
import { Item } from "@/lib/models/item";
import itemsService from "@/lib/service/itemService";
import { Category } from "@/lib/models/category";
import categoryService from "@/lib/service/categoryService";
import ItemCard from "./ItemCard";
import CategoryCard from "./CategoryCard";
import { init } from "next/dist/compiled/webpack/webpack";

interface TableHomePageProps {
    tablenumber: number;
}

const TableHomePage: React.FC<TableHomePageProps> = ({ tablenumber }) => {
    const items = useRealtimeTable<Item>({
        table: "items",
        fetchService: itemsService.fetchAllItems,
    });

    const categories = useRealtimeTable<Category>({
        table: "category",
        fetchService: categoryService.fetchAllCategories,
    });

    const [cartItems, setCartItems] = useState<Item[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [flyingItem, setFlyingItem] = useState<Item | null>(null);
    const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});

    const cartDropRef = useRef<HTMLDivElement>(null);

    const handleDropItem = (item: Item) => {
        setCartItems((prev) => [...prev, item]);
    };

    const handleAddItemWithGravity = (item: Item, sourceEl: HTMLDivElement) => {
        const sourceRect = sourceEl.getBoundingClientRect();
        const targetRect = cartDropRef.current!.getBoundingClientRect();

        // Calculate the horizontal and vertical offsets to the cart
        const deltaX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);

        // Physics Variables
        const initialVelocity = 15; // Slower initial velocity (adjust this for overall speed control)
        const upwardAcceleration = -3; // Upward acceleration (a = -10px/sec²)
        const downwardAcceleration = 3; // Downward acceleration due to gravity (a = 10px/sec²)

        let velocity = initialVelocity; // Current velocity for upward motion
        let positionY = sourceRect.top; // Initial position (start at the source position)
        let positionX = sourceRect.left; // Initial horizontal position
        let isMovingUp = true; // Flag to check if the item is still moving up
        let rotation = 0;
        // Time tracking (we'll use requestAnimationFrame to simulate continuous motion)
        let time = 0; // Time variable for our calculation

        // State for the floating item's style
        setFlyStyle({
            position: "fixed",
            top: positionY,
            left: positionX, // Start at the source horizontal position
            width: sourceRect.width * 0.66,
            height: sourceRect.height * 0.66,
            zIndex: 9999,
            backgroundImage: `url(${item.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            opacity: 1,
        });

        setFlyingItem(item);

        // The animation function that updates the item's position
        const animationFrame = () => {
            // Time increment (we'll adjust it in each frame to simulate velocity change)
            time += 1 / 144; // time = 1/fps
            // rotation += 10;
            // Calculate total vertical distance
            const totalVerticalDistance = targetRect.top - sourceRect.top;

            // Calculate how far the item has moved vertically
            const verticalProgress = Math.min(
                Math.max((positionY - sourceRect.top) / totalVerticalDistance, 0),
                1
            );

            // Use vertical progress to calculate horizontal offset
            const currentDeltaX = deltaX * verticalProgress * 4;

            if (isMovingUp) {
                // Update position and velocity for upward motion (until it reaches peak)
                positionY -= velocity; // Move up by current velocity
                velocity += upwardAcceleration; // Apply acceleration due to gravity (deceleration)

                // Once the upward velocity becomes 0 or negative, start moving downward
                if (velocity <= 0) {
                    isMovingUp = false; // Switch to downward motion
                    velocity = 0; // Reset velocity to 0 as the item starts falling
                }
            } else {
                // Update position and velocity for downward motion (after peak)
                positionY += velocity; // Move down by current velocity
                velocity += downwardAcceleration; // Apply acceleration due to gravity (falling)

                // If the item reaches the cart, stop the animation and drop it
                if (positionY >= targetRect.top) {
                    positionY = targetRect.top; // Stop at the cart position
                    setFlyStyle((prev) => ({
                        ...prev,
                        opacity: 0, // Fade out as it reaches the cart
                    }));

                    setTimeout(() => {
                        setFlyingItem(null); // Remove the item after animation completes
                        handleDropItem(item); // Add the item to the cart
                    }, 100); // Wait for the fade-out to complete before removing the item
                }
            }

            // Shrink during the fall
            const shrinkFactor = Math.max(0.5, 1 - (positionY - sourceRect.top) / (targetRect.top - sourceRect.top));
            // Update the style to reflect the new position and horizontal movement

            setFlyStyle((prev) => ({
                ...prev,
                top: positionY,
                left: positionX + currentDeltaX, // Apply the updated horizontal position
                width: sourceRect.width * 0.66 * shrinkFactor,
                height: sourceRect.height * 0.66 * shrinkFactor,
                transform: `translate(0, 0) rotate(${rotation}deg)`,
            }));

            // Continue the animation until the item reaches the cart
            if (positionY < targetRect.top) {
                requestAnimationFrame(animationFrame); // Continue animating until the item reaches the cart
            }
        };
        // Start the animation
        requestAnimationFrame(animationFrame);
    };


    return (
        <div className="w-full h-full flex flex-col items-center bg-white max-w-[450px] overflow-x-hidden relative">
            <Navbar tablenumber={tablenumber} />

            <div className="w-full flex items-center justify-center mx-4">
                <div className="flex w-full h-[36px] items-center border border-[#a2630b] mx-[12px] my-[6px] rounded-[10px]">
                    <div className="px-[6px] search-icon relative h-[80%] flex items-center">
                        <IoSearch fontSize={"18px"} color={"#4b3619"} />
                    </div>
                    <div className="italic text-[14px] pl-[6px]">Search</div>
                </div>
            </div>

            <SectionHeader HeaderText="Categories" />
            <div className="w-full relative max-w-[450px] min-h-[130px] px-4 flex justify-start items-center">
                <CategoryCard categories={categories} />
            </div>

            <SectionHeader HeaderText="Explore" />
            <ItemCard
                items={items}
                dropZoneRef={cartDropRef}
                onDropItem={handleDropItem}
                setIsDragging={setIsDragging}
                onAddItemFly={handleAddItemWithGravity}
            />

            {/* Cart / Drop Zone */}
            <div
                ref={cartDropRef}
                className={`${isDragging ? "w-[90px]" : "w-[70px]"
                    } aspect-square bg-[#fdd8a3] border-[#a2630b] border-[1.5px] rounded-full flex items-center justify-center fixed bottom-[40px] right-[32px] transition-all duration-300`}
            >
                <FaShoppingCart fontSize={"30px"} color={"#a2630b"} />
                {cartItems.length > 0 && (
                    <div className="absolute w-[24px] h-[24px] bg-[#38751f] rounded-full flex items-center justify-center text-white font-bold text-[12px] top-[-5px] right-[0px]">
                        <div>{cartItems.length}</div>
                    </div>
                )}
            </div>

            {/* Flying Animation Element */}
            {flyingItem && <div style={flyStyle}></div>}
        </div>
    );
};

export default TableHomePage;