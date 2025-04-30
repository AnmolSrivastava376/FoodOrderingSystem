import React from "react";
import { useState, useEffect } from "react";

interface NavbarProps {
    tablenumber: number;
}

const Navbar: React.FC<NavbarProps> = ({ tablenumber }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex w-full h-[50px] items-center border-b-[1px] border-[rgb(0,0,0,0.2)] rounded-b-[8px] justify-between px-[12px] py-[4px]">
            <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-[50%] bg-[url('/logo.jpeg')] bg-cover bg-center"></div>
                <div className="font-[600] text-[18px]">
                    MudCups
                </div>
            </div>
            <div className="flex gap-2 items-center">
                {isVisible && (
                    <div className="w-[24px] h-[24px] rounded-[50%] bg-[url('/hi.gif')] bg-cover bg-center"></div>
                )}
                <div className="w-fit h-[36px] rounded-[10px] px-9 bg-[#fcecd5] flex items-center justify-center">
                    {tablenumber}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
