import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myImage from "../../assets/logo.png";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegHeart, FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import Navigation from "./Navigation";
import { AuthContext } from "../../App";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Person, ShoppingCart, Favorite, LocalOffer, CardGiftcard, Logout } from "@mui/icons-material";

// Styled Badge Component
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    backgroundColor: "#FF3D3D",
    color: "white",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(AuthContext);

  return (
    <header className="w-full">
      {/* Top Strip */}
      <div className="border-t border-gray-300 bg-gray-100 py-3">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm font-medium text-gray-700">
            Get up to 50% off new season styles, limited time!
          </p>
          <ul className="flex items-center gap-4 mt-2 md:mt-0">
            <li>
              <Link to="/help-center" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={myImage} alt="Logo" className="h-12 md:h-16 lg:h-20" />
          </Link>

          {/* Search */}
          <div className="hidden md:flex w-1/2">
            <Search />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {context?.isLogin === false ? (
              <div className="flex gap-2 text-sm font-medium">
                <Link to="/Login" className="hover:text-[#FF3D3D]">Login</Link> /
                <Link to="/SignUp" className="hover:text-[#FF3D3D]">SignUp</Link>
              </div>
            ) : (
              <>
                <div className="relative">
                  <IconButton onClick={handleClick} className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                    <FaRegCircleUser className="text-xl hover:text-[#FF3D3D]" />
                  </IconButton>

                  {/* Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      className: "absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white z-50",
                    }}
                    transformOrigin={{ horizontal: "center", vertical: "top" }}
                    anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                  >
                    <Link to={"/MyAccount"}>
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      My Account
                    </MenuItem>
                    </Link>
                    <Link to={'/Order'}>
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <ShoppingCart fontSize="small" />
                      </ListItemIcon>
                      Orders
                    </MenuItem>
                    </Link>
                    <Link to={"/WishList"}>
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <Favorite fontSize="small" />
                      </ListItemIcon>
                      Wishlist
                    </MenuItem>
                    </Link>
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <LocalOffer fontSize="small" />
                      </ListItemIcon>
                      Coupons
                    </MenuItem>
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <CardGiftcard fontSize="small" />
                      </ListItemIcon>
                      Gift Card
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </>
            )}

            <Link to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={0}>
                  <IoCartOutline className="text-xl hover:text-[#FF3D3D]" />
                </StyledBadge>
              </IconButton>
            </Link>
            
            <Link to={"/WishList"}>
            <IconButton aria-label="wishlist">
              <StyledBadge badgeContent={0}>
                <FaRegHeart className="text-xl hover:text-[#FF3D3D]" />
              </StyledBadge>
            </IconButton>
            </Link>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;