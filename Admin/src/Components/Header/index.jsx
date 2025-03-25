import React, { useState,useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { RiMenuFold2Fill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { FiUser, FiSettings, FiLogOut, FiHome, FiUsers } from "react-icons/fi";
import img from "../../assets/woman.png";
import img1 from "../../assets/logo.png";
import  Button  from "@mui/material/Button";
import { AuthContext } from "../../App";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 5px",
    backgroundColor: "#FF3D3D",
    color: "white",
  },
}));

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
 // Dummy context for example
  const context = useContext(AuthContext);

  return (
    <header className="w-full h-20 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section - Logo and Menu Button */}
      <div className="flex items-center gap-4">
        <img src={img1} alt="Logo" className="w-full h-16 object-contain" />
        <IconButton className="p-0 w-auto h-auto" size="small">
          <RiMenuFold2Fill className="text-[24px] text-gray-700 hover:text-[#FF3D3D]" />
        </IconButton>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="relative flex items-center gap-6">
        {/* Notification Icon */}
        <IconButton aria-label="notifications" className="p-0 w-auto h-auto">
          <StyledBadge badgeContent={4} color="primary">
            <MdNotifications className="text-[24px] text-gray-700" />
          </StyledBadge>
        </IconButton>

        {/* Conditional Rendering for Login/Profile */}
        {context.isLogin === true ? (
          // Admin Profile
          <div className="relative">
            <img
              src={img}
              alt="Admin Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-6">
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiHome className="text-gray-600" /> Dashboard
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiUsers className="text-gray-600" /> Manage Users
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiUser className="text-gray-600" /> Profile
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiSettings className="text-gray-600" /> Settings
                </button>
                <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <FiLogOut className="text-gray-600" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button className="!bg-[#FF3D3D] !text-white hover:!bg-white hover:!text-[#FF3D3D] transition-colors duration-300">
          Login
        </Button>
        
        )}
      </div>
    </header>
  );
}

export default Header;
