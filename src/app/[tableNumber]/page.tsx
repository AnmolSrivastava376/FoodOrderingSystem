'use client'
import InvalidTableNumber from "@/components/Error/InvalidTableNumber";
import TableHomePage from "@/components/TablePage/TableHomePage";
import { useEffect } from "react";
import { use } from "react";

interface PageProps {
    params: Promise<{
        tableNumber: string;
    }>;
}

export default function TablePage({ params }: PageProps) {
    const { tableNumber } = use(params);

    if(!isNaN(Number(tableNumber))) {
        return (
            <div className="flex relative items-center justify-center w-[100vw] h-[100vh] bg-gray-200">
                <TableHomePage tablenumber={Number(tableNumber)}/>
            </div>
        );
    }
    else {
        return (
            <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-gray-200">
                <InvalidTableNumber/>
            </div>
        );
    }
}