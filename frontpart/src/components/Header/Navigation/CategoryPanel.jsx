import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

function CategoryPanel({ isopenCategory, openCategoryPanel }) {
    const [openCategories, setOpenCategories] = useState({});
    const [openSubcategories, setOpenSubcategories] = useState({});

    // Toggle main category
    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],  
        }));
    };

    // Toggle subcategory
    const toggleSubcategory = (subcategory) => {
        setOpenSubcategories((prev) => ({
            ...prev,
            [subcategory]: !prev[subcategory],  
        }));
    };

    const categories = [
        { name: "Fashion", subcategories: ["Men", "Women", "Kids", "Accessories", "Footwear"] },
        { name: "Electronics", subcategories: ["Mobiles", "Laptops", "Headphones", "Cameras"] },
        { name: "Home & Kitchen", subcategories: ["Furniture", "Appliances", "Decor", "Cookware"] },
        { name: "Beauty & Personal Care", subcategories: ["Skincare", "Makeup", "Haircare", "Grooming"] },
        { name: "Sports & Fitness", subcategories: ["Gym Equipment", "Outdoor", "Sportswear", "Supplements"] },
        { name: "Books & Stationery", subcategories: ["Fiction", "Non-fiction", "Study Materials", "Office Supplies"] },
        { name: "Toys & Baby Care", subcategories: ["Toys", "Baby Essentials", "Clothing", "Health Care"] },
        { name: "Automobile", subcategories: ["Car Accessories", "Bike Accessories", "Spare Parts"] }
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <h3 className='p-3 text-[16px] font-bold text-[#282727]'>
                Shop by Categories
            </h3>

            <div className='scroll'>
                <ul className='w-full'>
                    {categories.map((category, index) => (
                        <li key={index} className="list-none">
                            <Button 
                                className="w-full flex justify-between items-center !text-[#2a2929] hover:!text-[#FF3D3D] !bg-white px-3 py-2"
                                onClick={() => toggleCategory(category.name)}
                            >
                                <span className="text-left flex-1">{category.name}</span>
                                {openCategories[category.name] ? (
                                    <IoRemoveCircleOutline className='text-[20px] ml-auto' />
                                ) : (
                                    <IoAddCircleOutline className='text-[20px] ml-auto' />
                                )}
                            </Button>

                            {/* Submenu - Only show when the category is open */}
                            {openCategories[category.name] && (
                                <ul className='submenu pl-5'>
                                    {category.subcategories.map((sub, i) => (
                                        <li key={i} className="list-none">
                                            <Button 
                                                className="w-full flex justify-between items-center !text-[#2a2929] hover:!text-[#FF3D3D] !bg-white px-3 py-2"
                                                onClick={() => toggleSubcategory(sub)}
                                            >
                                                <span className="text-left flex-1">{sub}</span>
                                                {openSubcategories[sub] ? (
                                                    <IoRemoveCircleOutline className='text-[18px] ml-auto' />
                                                ) : (
                                                    <IoAddCircleOutline className='text-[18px] ml-auto' />
                                                )}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );

    return (
        <Drawer open={isopenCategory} onClose={() => openCategoryPanel(false)}>
            {DrawerList}
        </Drawer>
    );
}

export default CategoryPanel;
