import React ,{useContext}from "react";
import DashCom from "../../Components/DashCom";
import img1 from "../../assets/onlineshop.png";
import Button from "@mui/material/Button";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState,PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ComposedChart, Bar,Area,Scatter,} from "recharts";
  import { DialogContext } from "../../App";
  import AddProducts from "../Products/addProducts";

const itemsPerPage = 2;

const userSalesData = [
  { name: "Jan", totalUsers: 480, totalSales: 11500 },
  { name: "Feb", totalUsers: 720, totalSales: 15200 },
  { name: "Mar", totalUsers: 880, totalSales: 17500 },
  { name: "Apr", totalUsers: 1050, totalSales: 22000 },
  { name: "May", totalUsers: 1400, totalSales: 24000 },
  { name: "Jun", totalUsers: 1350, totalSales: 27000 },
  { name: "Jul", totalUsers: 1750, totalSales: 31000 },
];

function DashBoard() {
  const { openDialog } = useContext(DialogContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const userSalesData1 = [
    { name: "Jan", totalUsers: 480, totalSales: 11500 },
    { name: "Feb", totalUsers: 720, totalSales: 15200 },
    { name: "Mar", totalUsers: 880, totalSales: 17500 },
    { name: "Apr", totalUsers: 1050, totalSales: 22000 },
    { name: "May", totalUsers: 1400, totalSales: 24000 },
    { name: "Jun", totalUsers: 1350, totalSales: 27000 },
    { name: "Jul", totalUsers: 1750, totalSales: 31000 },
  ];
  
 
  
  const products = [
    { 
      id: "501", image: "/images/iphone15.jpg", brand: "Apple", name: "iPhone 15", color: "Black", category: "Electronics", subcategory: "Smartphones", stock: "In Stock", price: "$999", date: "2025-03-10", rating: 4.8, reviews: 1200, description: "Latest Apple smartphone with A16 Bionic chip and 48MP camera." 
    },
    { 
      id: "502", image: "/images/dell-xps15.jpg", brand: "Dell", name: "XPS 15", color: "Silver", category: "Computers", subcategory: "Laptops", stock: "Out of Stock", price: "$1499", date: "2025-02-25", rating: 4.6, reviews: 890, description: "High-performance laptop with Intel i9 and 4K OLED display." 
    },
    { 
      id: "503", image: "/images/sony-headphones.jpg", brand: "Sony", name: "WH-1000XM5", color: "Blue", category: "Accessories", subcategory: "Headphones", stock: "Low Stock", price: "$399", date: "2025-03-05", rating: 4.7, reviews: 2100, description: "Premium noise-canceling wireless headphones with 30-hour battery." 
    },
    { 
      id: "504", image: "/images/galaxy-watch6.jpg", brand: "Samsung", name: "Galaxy Watch 6", color: "Black", category: "Wearables", subcategory: "Smartwatches", stock: "In Stock", price: "$349", date: "2025-02-28", rating: 4.5, reviews: 750, description: "Advanced fitness smartwatch with ECG and sleep tracking." 
    },
  ];


  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const categories = ['All', 'Electronics', 'Computers', 'Accessories', 'Wearables'];
  return (
    <>
      <div className="w-510px p-5 border border-gray-700 flex items-center justify-center mb-5 ml-[300px] mr-4">
        <div className="info">
          <h1>
            Hi Good Morning,<br />
            User
          </h1>
          <img
            src="https://cdn-icons-gif.flaticon.com/11321/11321431.gif"
            alt=""
            className="w-[10%]"
          />
          <p>Here's What Happening on your store today. See the total sale</p>
          <br />
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 hover:text-gray-200">
  Add Product
</Button>

        </div>

        <img src="https://cdn-icons-gif.flaticon.com/17905/17905666.gif" alt="" className="w-[20%] h-auto ml-auto" />
      </div>

      <div className=" ml-[300px] mr-4">
      <DashCom />

      </div>



      <div className="card my-3 p-4 bg-white shadow-lg rounded-lg  ml-[300px] mr-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-700">Product Management</div>
        <div className="flex space-x-4">
          <select className="p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Export</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => openDialog(<AddProducts />, "Add New Product")}>Add Product</button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" className="w-4 h-4 text-blue-600" /></th>
              <th className="px-6 py-3">Product Details</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Subcategory</th>
              <th className="px-6 py-3">Stock Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Added Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4"><input type="checkbox" className="w-4 h-4 text-blue-600" /></td>
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <a href={`/product/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-500">{product.name}</a>
                    <p className="text-sm text-gray-500">ID: {product.id} • {product.brand}</p>
                    <p className="text-sm text-gray-600">Color: {product.color} • ⭐ {product.rating} ({product.reviews} reviews)</p>
                    <p className="text-xs text-gray-500">{product.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.subcategory}</td>
                <td className={`px-6 py-4 ${product.stock === "In Stock" ? "text-green-500" : product.stock === "Low Stock" ? "text-yellow-500" : "text-red-500"}`}>{product.stock}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.date}</td>
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <button className="text-green-500 hover:text-green-700" title="View Details"><FaEye size={18} /></button>
                  <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                  <button className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 space-x-2">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
          <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>


  
      <div className="card my-3 p-4 bg-white shadow-lg rounded-lg  ml-[300px] mr-4">
      <div className="flex items-center justify-between mb-4 text-lg font-semibold text-gray-700">
        Recent Orders
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Product ID</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/101" className="text-blue-500 hover:underline">101</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/501" className="text-blue-500 hover:underline">501</a>
              </td>
              <td className="px-6 py-4">Smartphone</td>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Electronics</td>
              <td className="px-6 py-4">$699</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/102" className="text-blue-500 hover:underline">102</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/502" className="text-blue-500 hover:underline">502</a>
              </td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Computers</td>
              <td className="px-6 py-4">$1199</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/103" className="text-blue-500 hover:underline">103</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/503" className="text-blue-500 hover:underline">503</a>
              </td>
              <td className="px-6 py-4">Headphones</td>
              <td className="px-6 py-4">Blue</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$199</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/104" className="text-blue-500 hover:underline">104</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/504" className="text-blue-500 hover:underline">504</a>
              </td>
              <td className="px-6 py-4">Smartwatch</td>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Wearables</td>
              <td className="px-6 py-4">$299</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
  

    <div className="p-4 bg-white rounded-xl shadow-md  ml-[300px] mr-4">
      <h2 className="text-lg font-semibold mb-4">Total Users vs Total Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userSalesData1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="totalUsers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>


    <div className="p-4 bg-white rounded-xl shadow-md  ml-[300px] mr-4">
      <h2 className="text-lg font-semibold mb-4">Total Users vs Total Sales</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={userSalesData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="totalSales" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="totalSales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="totalUsers" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
   
    </>
  );
}

export default DashBoard;