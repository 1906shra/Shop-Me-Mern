import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "@mui/material/Button";

function AddCategory() {
    const [categories, setCategories] = useState([
        { id: 1, name: "Electronics", image: "https://via.placeholder.com/50" },
        { id: 2, name: "Computers", image: "https://via.placeholder.com/50" },
        { id: 3, name: "Accessories", image: "https://via.placeholder.com/50" },
        { id: 4, name: "Wearables", image: "https://via.placeholder.com/50" },
        { id: 5, name: "Home Appliances", image: "https://via.placeholder.com/50" },
        { id: 6, name: "Furniture", image: "https://via.placeholder.com/50" },
        { id: 7, name: "Books", image: "https://via.placeholder.com/50" },
        { id: 8, name: "Clothing", image: "https://via.placeholder.com/50" }
    ]);

    return (
        <div className="w-[1240px] flex items-center justify-between mb-5 bg-white shadow-md px-10 p-5 ml-[300px] mr-4">
            <div className="card my-3 p-4 bg-white shadow-lg rounded-lg w-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-gray-700">Category Management</div>
                    <Button variant="contained" color="primary">Add Category</Button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Category Name</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{category.id}</td>
                                    <td className="px-6 py-4">
                                        <img src={category.image} alt={category.name} className="w-12 h-12 rounded-md object-cover" />
                                    </td>
                                    <td className="px-6 py-4">{category.name}</td>
                                    <td className="px-6 py-4 text-center flex justify-center space-x-4">
                                        <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                                        <button className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
