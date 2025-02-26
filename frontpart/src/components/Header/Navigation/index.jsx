import { Button } from '@mui/material';
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from "react-icons/gi";
import CategoryPanel from './CategoryPanel';
import './style.css';

function Navigation() {
    const [isopenCategory, setopenCategoryPanel] = useState(false);

    const openCategoryPanel = (state) => {
        setopenCategoryPanel(state);
    };

    return (
        <>
            <nav className="py-3 bg-white shadow-md">
                <div className="container flex items-center justify-between px-4 gap-5 flex-wrap md:flex-nowrap">
                    <div className="col_1 w-full md:w-[30%] flex items-center justify-center md:justify-start">
                        <Button
                            className="!text-black flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            onClick={() => openCategoryPanel(true)}
                        >
                            <IoMenu className="text-[18px]" />
                            Shop By Categories
                            <FaAngleDown />
                        </Button>
                    </div>

                    <div className="col_2 w-full md:w-[70%] flex flex-col md:flex-row items-center justify-between">
                        <ul className="flex flex-wrap md:flex-nowrap items-center justify-start gap-6 md:gap-12 w-full md:w-auto !z-100">
                            <li className="relative group">
                                <Link to="/" className="link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" alt="fashion" className='w-6 h-6' />
                                    Fashion
                                </Link>
                                <div className='submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible z-[100] group-hover:visible transition-all duration-300'>
                                    <ul className="p-2">
                                        <li className="relative group">
                                            <Button className="w-full text-left">Women</Button>
                                            <div className='submenu absolute top-0 left-full min-w-[150px] bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300'>
                                                <ul className="p-2">
                                                    <li><Button className="w-full text-left">T-Shirts</Button></li>
                                                    <li><Button className="w-full text-left">Jeans</Button></li>
                                                    <li><Button className="w-full text-left">Tops</Button></li>
                                                    <li><Button className="w-full text-left">Dresses</Button></li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li><Button className="w-full text-left">Men</Button></li>
                                        <li><Button className="w-full text-left">Kids</Button></li>
                                        <li><Button className="w-full text-left">Accessories</Button></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative group">
                                <Link to="/" className="link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" alt="electronic" className='w-6 h-6' />
                                    Electronics
                                </Link>
                                <div className='submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible z-[100] group-hover:visible transition-all duration-300'>
                                    <ul className="p-2">
                                        <li><Button className="w-full text-left">Mobiles</Button></li>
                                        <li><Button className="w-full text-left">Laptops</Button></li>
                                        <li><Button className="w-full text-left">Cameras</Button></li>
                                        <li><Button className="w-full text-left">Accessories</Button></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative group">
                                <Link to="/" className="link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    <img src="https://api.spicezgold.com/download/file_1734525239704_foot.png" alt="footwear" className='w-6 h-6' />
                                    Footwear
                                </Link>
                                <div className='submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible z-[100] group-hover:visible transition-all duration-300'>
                                    <ul className="p-2">
                                        <li><Button className="w-full text-left">Men</Button></li>
                                        <li><Button className="w-full text-left">Women</Button></li>
                                        <li><Button className="w-full text-left">Kids</Button></li>
                                        <li><Button className="w-full text-left">Sports Shoes</Button></li>
                                        <li><Button className="w-full text-left">Casual Shoes</Button></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative group">
                                <Link to="/" className="link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    <img src="https://api.spicezgold.com/download/file_1734525239704_foot.png" alt="footwear" className='w-6 h-6' />
                                    Furniture
                                </Link>
                                <div className='submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg opacity-0 group-hover:opacity-100 invisible z-[100] group-hover:visible transition-all duration-300'>
                                    <ul className="p-2">
                                        <li><Button className="w-full text-left">Men</Button></li>
                                        <li><Button className="w-full text-left">Women</Button></li>
                                        <li><Button className="w-full text-left">Kids</Button></li>
                                        <li><Button className="w-full text-left">Sports Shoes</Button></li>
                                        <li><Button className="w-full text-left">Casual Shoes</Button></li>
                                    </ul>
                                </div>
                            </li>
                            <li><Link to="/" className="link transition hover:text-[#FF3D3D]">About</Link></li>
                        </ul>
                        <div className='hidden lg:flex items-center pr-8 gap-1'>
                            <GiCommercialAirplane />
                            <p className='gap-1'>Free International Delivery</p>
                        </div>
                    </div>
                </div>
            </nav>

            <CategoryPanel openCategoryPanel={openCategoryPanel} isopenCategory={isopenCategory} />
        </>
    );
}

export default Navigation;  