'use client';
import { subscribeToItems } from "@/lib/hooks/itemSubscription";
import { Item } from "@/lib/models/item";

export default function KitchenPage() {
    const items = subscribeToItems();

    return (
        <div className="container">
            <div className="flex p-4 gap-4 flex-wrap">
                {items.map((item: Item) => (
                    <div key={item.id} className="card flex flex-col gap-2 bg-gray-200 w-[150px] text-wrap rounded-xl overflow-hidden">
                        <img src={item.image_url} alt={item.name} className="card-image w-[150px] h-[100px]" />
                        <h3 className="text-black pl-1">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
