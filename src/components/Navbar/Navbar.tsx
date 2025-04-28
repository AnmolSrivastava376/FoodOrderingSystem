import React from "react";

interface NavbarProps {
    tablenumber: number;
}

const Navbar: React.FC<NavbarProps> = ({ tablenumber }) => {
    return (
        <div className="w-full h-[50px] bg-[rgb(183,118,64)] flex items-center justify-between px-2 py-2 rounded-b-[4px]">
            <div className="w-full h-full flex items-center gap-2">
                <div className="bg-[url('/logo.jpeg')] bg-cover bg-center h-full aspect-square rounded-[50%] overflow-hidden"></div>
                <div className="text-white text-xl">MudCups</div>
            </div>
            <div className="text-white h-[30px] bg-[rgb(202,150,78)] aspect-square rounded-[50%] flex items-center justify-center">{tablenumber}</div>
        </div>
    );
};

export default Navbar;
