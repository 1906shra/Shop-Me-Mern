import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div className="w-full sm:w-30 md:w-40 lg:w-56 bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300">
      {/* Image Wrapper */}
      <div className="relative group">
        <Link to="/">
          <div className="relative w-full h-40 md:h-44">
            <img
              src="https://m.media-amazon.com/images/I/8137ccM2gNL._AC_UL600_.jpg"
              alt="Product"
              className="w-3/4 h-full object-cover rounded-t-lg transition-opacity duration-300"
            />
            <img
              src="https://m.media-amazon.com/images/I/51+UOAXDwXL._SS600_.jpg"
              alt="Product Hover"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-3 text-center">
        <h3 className="text-sm md:text-base font-semibold text-gray-800">
          Solimo Revolving Plastic Tabletop
        </h3>
        <h6 className="text-xs md:text-sm text-gray-600">
          Tiered Shelf Spice Rack Set Of 16 Pieces
        </h6>

        {/* Price Section */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-base md:text-lg font-bold text-green-600">₹1,299</span>
          <span className="text-xs md:text-sm line-through text-gray-500">₹1,599</span>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center items-center text-yellow-400 text-xs md:text-sm mt-2">
          ⭐⭐⭐⭐⭐ <span className="text-gray-500 ml-1">(4.8)</span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-3 bg-[#FF3D3D] hover:bg-[#f27474] text-white text-sm md:text-base py-2 rounded-lg transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
