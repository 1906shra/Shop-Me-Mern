import React from "react";
import { Link } from "react-router-dom";
import myImage from "../../assets/logo.png"; // Adjust path if needed
import Search from "../Search";
import Badge from "@mui/material/Badge"; // ✅ Corrected import (removed BadgeProps)
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { FaRegHeart } from "react-icons/fa";

import { IoCartOutline } from "react-icons/io5";
import Navigation from "./Navigation";
// ✅ Corrected StyledBadge (removed BadgeProps)
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    backgroundColor:'#FF3D3D' ,
    color: "white", 
      
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  
  },
}));

function Header() {
  return (
    <header className="w-full">
      {/* Top Strip */}
      <div className="top-strip border-t-[1px] border-gray-300 bg-gray-100 py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <p className="text-sm font-medium text-gray-700">
              Get up to 50% off new season styles, limited time!
            </p>
            <ul className="flex items-center gap-4 mt-2 md:mt-0">
              <li>
                <Link
                  to="/help-center"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                >
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className=" header bg-white shadow-md py-4">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="col1 w-[25%]">
            <Link to="/">
              <img
                src={myImage}
                alt="Logo"
                className="h-12 w-auto md:h-16 lg:h-20"
              />
            </Link>
          </div>

          {/* Navigation Placeholder */}
          <div className="col2 hidden md:flex gap-6  w-[45%]">
            <Search />
          </div>

          {/* User Actions */}
          <div className="col3 flex items-center gap-4  w-[30%] pl-10">
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link to="/Login" className="hover:text-[#FF3D3D]
                
                ">
                  Login
                </Link>
                /{" "}
                <Link to="/SignUp" className="hover:text-[#FF3D3D]">
                  SignUp
                </Link>
              </li>

              <li>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={0} color="secondary">
                  <IoCartOutline 
                   className="hover:text-[#FF3D3D]"
                  />
                  </StyledBadge>
                </IconButton>
              </li>
              <li>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={0} color="secondary">
                   <FaRegHeart
                     className="hover:text-[#FF3D3D]"
                   />
                  </StyledBadge>
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <Navigation/>
    </header>
  );
}

export default Header;
