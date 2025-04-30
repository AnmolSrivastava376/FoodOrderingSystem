import React from 'react';

interface SectionHeaderProps {
    HeaderText: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ HeaderText }) => {
    return (
        <div className="h-fit w-full my-[6px] flex items-center justify-center relative">
            <div className="h-[1px] w-full absolute top-[50%] horizontal-line"></div>
            <span className="text-[#a2630b] max-w-[200px] text-center text-[12px] font-[700] bg-white z-[1] px-2 tracking-wider">
                {HeaderText.toUpperCase()}
            </span>
        </div>
    );
};

export default SectionHeader;