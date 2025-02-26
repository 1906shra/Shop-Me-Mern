import React from 'react'
import '../Search/style.css';
import Button from '@mui/material/Button';
import { IoIosSearch } from "react-icons/io";

function Search() {
  return (
    <div className="searchBox w-full h-[50px] rounded-[15px] border border-black shadow-sm relative p-2 flex items-center">
    <input 
      type="text" 
      className="w-full h-[30px] outline-none bg-transparent p-2 pr-12 text-black font-medium 
                 placeholder:text-[10px] sm:placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg 
                 sm:placeholder-shown:truncate"
      placeholder="Search for Products, Brands and More"
    />
    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black">
      <IoIosSearch className="w-5 h-5" />
    </button>
  </div>




  )
}

export default Search