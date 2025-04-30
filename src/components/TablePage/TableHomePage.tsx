import React from 'react';
import Navbar from '../Navbar/Navbar';

interface TableHomePageProps {
    tablenumber: number;
}

const TableHomePage: React.FC<TableHomePageProps> = ({ tablenumber }) => {
    return (
        <div className='w-full h-full flex flex-col items-center bg-white'>
            <Navbar tablenumber={tablenumber} />
        </div>
    );
};

export default TableHomePage;