import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import SideBar from '../../components/Sidebar';
import ProductItem from "../../components/ProductItem";
import { Select, MenuItem, IconButton } from '@mui/material';
import { GridView, ViewList } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function ProductListing() {
  const [sortOption, setSortOption] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const products = Array(20).fill(0); // Replace with actual fetched data
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto mb-4 px-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="hover:text-[#FF3D3D] text-gray-600 font-medium">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/fashion" className="hover:text-[#FF3D3D] text-gray-600 font-medium">
            Fashion
          </Link>
          <Typography sx={{ color: 'text.primary' }} className="font-semibold text-gray-800">
            Products
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Sidebar & Products Layout */}
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white p-6 rounded-xl shadow-lg">
          <SideBar />
        </div>

        {/* Product Grid Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
          {/* Sorting & View Options Section */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4 p-4 bg-white">
            {/* Product Count */}
            <div className="text-lg font-medium text-gray-700">
              Showing <span className="font-bold text-blue-600">{currentProducts.length}</span> of <span className="font-bold">{products.length}</span> products
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                variant="standard"
                disableUnderline
                className="text-[#FF3D3D] font-semibold"
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </div>

            {/* View Mode Toggle (Grid/List) */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">View:</span>
              <IconButton
                onClick={() => setViewMode("grid")}
                sx={{
                  color: viewMode === "grid" ? "#FF3D3D" : "gray",
                  transition: "color 0.2s ease-in-out"
                }}
              >
                <GridView />
              </IconButton>
              <IconButton
                onClick={() => setViewMode("list")}
                sx={{
                  color: viewMode === "list" ? "#FF3D3D" : "gray",
                  transition: "color 0.2s ease-in-out"
                }}
              >
                <ViewList />
              </IconButton>
            </div>
          </div>

          {/* Divider Line */}
          <hr className="border-t border-gray-300 mb-4" />

          {/* Product Grid */}
          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-6`}>
            {currentProducts.map((_, index) => (
              <ProductItem key={index} />
            ))}
          </div>

          {/* No Products Found Message */}
          {currentProducts.length === 0 && (
            <div className="text-center text-gray-500 py-10 text-lg">
              No products available.
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="secondary"
              sx={{
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#FF3D3D",
                  color: "white",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListing;
