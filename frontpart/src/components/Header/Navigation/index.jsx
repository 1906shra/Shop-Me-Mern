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
                          Browse Categories
                            <FaAngleDown />
                        </Button>
                    </div>

                    <div className="col_2 w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between">
                        <ul className="flex flex-wrap md:flex-nowrap items-center justify-start gap-6 md:gap-12 w-full md:w-auto !z-100">

                            <li className="relative group">
                                <Link to="/" className=" link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    
                                    Home

                                </Link>
                               
                            </li>
                            <li className="relative group">
    <Link 
        to="/" 
        className="flex items-center  py-2 rounded-md bg-white  hover:text-[#FF3D3D]"
    >
        <img 
            src="https://api.spicezgold.com/download/file_1734525204708_fash.png" 
            alt="fashion" 
            className='w-6 h-6 object-cover rounded-md' 
        />
        <span className=" text-gray-700 group-hover:text-[#FF3D3D]">Fashion</span>
    </Link>

    {/* First-Level Dropdown */}
    <div className="absolute top-full left-0 min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <ul className="py-2">

            {/* 🛍️ Women Category */}
            <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                    Women 
                </button>

                {/* Women Subcategories */}
                <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="py-2">
                        {/* 👕 T-Shirts */}
                        <li className="relative group">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                                T-Shirts 
                            </button>

                            {/* T-Shirts Subcategories */}
                            <div className="absolute top-0 left-full min-w-[180px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <ul className="py-2">
                                    <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Casual T-Shirts</button></li>
                                    <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Formal T-Shirts</button></li>
                                </ul>
                            </div>
                        </li>
                        {/* 👖 Jeans */}
                        <li className="relative group">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                                Jeans 
                            </button>
                            <div className="absolute top-0 left-full min-w-[180px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <ul className="py-2">
                                    <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Skinny Jeans</button></li>
                                    <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Wide-Leg Jeans</button></li>
                                </ul>
                            </div>
                        </li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Dresses</button></li>
                    </ul>
                </div>
            </li>

            {/* 👔 Men Category */}
            <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                    Men 
                </button>
                <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="py-2">
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Shirts</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Jeans</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Jackets</button></li>
                    </ul>
                </div>
            </li>

            {/* 🧸 Kids Category */}
            <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                    Kids 
                </button>
                <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="py-2">
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">T-Shirts</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Shorts</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Sweaters</button></li>
                    </ul>
                </div>
            </li>

            {/* 🎒 Accessories Category */}
            <li className="relative group">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between">
                    Accessories 
                </button>
                <div className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <ul className="py-2">
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Bags</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Watches</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">Belts</button></li>
                    </ul>
                </div>
            </li>

        </ul>
    </div>
</li>

             <li className="relative group">
                                <Link to="/" className="link transition hover:text-[#FF3D3D] flex items-center gap-1">
                                    <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" alt="electronic" className='w-6 h-6' />
                                    <span className=" text-gray-700 group-hover:text-[#FF3D3D]">Electronics</span>
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
                                    <span className=" text-gray-700 group-hover:text-[#FF3D3D]">Footwear</span>
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
                                    <span className=" text-gray-700 group-hover:text-[#FF3D3D]">Furniture</span>
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
                        </ul>
                        <div className='hidden lg:flex items-center pr-8 gap-1'>
                            <GiCommercialAirplane />
                            <p className='gap-6 '>Free International Delivery</p>
                        </div>
                    </div>
                </div>
            </nav>

            <CategoryPanel openCategoryPanel={openCategoryPanel} isopenCategory={isopenCategory} />
        </>
    );
}

export default Navigation;  