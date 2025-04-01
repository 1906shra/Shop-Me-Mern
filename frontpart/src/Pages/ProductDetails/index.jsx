import React, { useState } from "react";
import ProductZoom from "../../components/ProductZoom";
import ProductSlider from "../../components/ProductSlider";

import { FaStar, FaRegStar, FaRegHeart, FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import QtyBox from "./QtyBox";


function ProductDetail() {
  const phoneColors = [
    { name: "Ethereal Blue", hex: "#4A90E2" },
    { name: "Shadow Black", hex: "#1C1C1C" },
    { name: "Sunset Orange", hex: "#FF5733" },
    { name: "Glacier White", hex: "#EAEAEA" },
  ];
  
  const [reviews, setReviews] = useState([
    { name: "Rahul S.", rating: 4, text: "Great value for money! The battery life is amazing, and it handles daily tasks well. Only wish the camera was a bit better." },
    { name: "Priya M.", rating: 5, text: "Best budget phone! Smooth performance, decent display, and good storage options. Highly recommended." },
    { name: "Amit K.", rating: 3, text: "Okay phone for the price. Works fine for basic use, but struggles with heavy gaming." },
    { name: "Neha D.", rating: 4, text: "Good design, solid battery backup, and smooth UI. Worth it for budget users." },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.text.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, text: "" }); // Reset form
    }
  };

  const [selectedColor, setSelectedColor] = useState(phoneColors[0].name);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="bg-gray-50 py-8 px-4 lg:px-10  items-center justify-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-6">
        {/* Product Image / Zoom Section */}
        <div className="w-full lg:w-[40%] flex justify-center">
          <ProductZoom />
        </div>

        {/* Product Content Section */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900">Poco C61 - 4GB RAM | 64GB ROM | {selectedColor}</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium text-lg">Brand: <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md">Poco</span></span>
            <div className="flex items-center text-yellow-500 text-lg">
              {[...Array(4)].map((_, index) => (<FaStar key={index} />))} <FaRegStar />
              <span className="text-gray-700 text-sm ml-1">(120 Reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span className="line-through text-gray-500">₹9,999</span>
            <span className="text-red-600 font-semibold text-2xl">₹7,499</span>
            <span className="text-green-600 font-medium text-lg">You save 25%!</span>
          </div>

          <span className="text-green-600 font-semibold text-lg">In Stock</span>

          <div className="p-4 bg-white border border-white rounded-lg">
            <h3 className="text-gray-800 font-semibold">Choose Color:</h3>
            <div className="flex gap-3 mt-2">
              {phoneColors.map((color) => (
                <button
                  key={color.name}
                  className={`w-7 h-7 rounded-full border-1 transition-all ${selectedColor === color.name ? "border-black ring-1 ring-black" : "border-gray-300"}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          <QtyBox />

          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => setWishlist(!wishlist)} className="text-[#FF3D3D] text-2xl">
              {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
            <a href="#" className="text-[#FF3D3D] hover:underline" onClick={(e) => { e.preventDefault(); setWishlist(!wishlist); }}>
              {wishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </a>
          </div>

          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex flex-col gap-2">
            <div className="flex items-center text-gray-700">
              <FaTruck className="text-green-600 text-xl mr-2" />
              <span>Estimated Delivery: <strong>3-5 business days</strong></span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaShieldAlt className="text-blue-600 text-xl mr-2" />
              <span>1 Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="container pt-10">
  <div className="flex items-center gap-6 border-b-2 border-gray-200 pb-3">
    {["Description", "Product Details", "Reviews"].map((item) => (
      <span
        key={item}
        className={`cursor-pointer text-lg font-medium transition duration-200 ${
          activeTab === item ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"
        }`}
        onClick={() => setActiveTab(item)}
      >
        {item}
      </span>
    ))}
  </div>

  <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
    {activeTab === "Description" && (
      <p className="text-gray-700">
        The **Poco C61** is built for performance and efficiency, making it an ideal budget-friendly smartphone.  
        It features a **6.5-inch HD+ display** for an immersive viewing experience, powered by the **MediaTek Helio G35**  
        processor, ensuring smooth multitasking. With **4GB of RAM** and **64GB storage** (expandable up to 256GB),  
        you'll have ample space for your apps, photos, and files.  

        The device houses a **5000mAh battery** with **fast charging** support, keeping you powered throughout the day.  
        Capture stunning moments with its **13MP AI Dual Rear Camera**, while the **5MP front camera** delivers  
        clear selfies and video calls. Running on **Android 11 with MIUI**, it ensures a clean and responsive user experience.  
        Whether you're gaming, streaming, or browsing, the Poco C61 delivers reliable performance at an unbeatable price.  
      </p>
    )}

    {activeTab === "Product Details" && (
      <ul className="list-disc list-inside text-gray-700">
        <li><strong>Display:</strong> 6.5-inch HD+ LCD</li>
        <li><strong>Processor:</strong> MediaTek Helio G35</li>
        <li><strong>RAM:</strong> 4GB</li>
        <li><strong>Storage:</strong> 64GB (expandable up to 256GB)</li>
        <li><strong>Battery:</strong> 5000mAh with fast charging</li>
        <li><strong>Camera:</strong> 13MP AI Dual Rear | 5MP Front</li>
        <li><strong>OS:</strong> Android 11 with MIUI</li>
        <li><strong>Connectivity:</strong> 4G LTE, WiFi, Bluetooth 5.0</li>
        <li><strong>Ports:</strong> USB-C, 3.5mm headphone jack</li>
      </ul>
    )}

    {activeTab === "Reviews" && (
      <div className="space-y-4">
        <div className="border-b pb-3">
          <p className="text-gray-700"><strong>⭐️⭐️⭐️⭐️☆</strong> - Great value for money! The battery life is amazing, and it handles daily tasks well. Only wish the camera was a bit better.</p>
          <p className="text-sm text-gray-500">— Rahul S.</p>
        </div>

        <div className="border-b pb-3">
          <p className="text-gray-700"><strong>⭐️⭐️⭐️⭐️⭐️</strong> - Best budget phone! Smooth performance, decent display, and good storage options. Highly recommended.</p>
          <p className="text-sm text-gray-500">— Priya M.</p>
        </div>

        <div className="border-b pb-3">
          <p className="text-gray-700"><strong>⭐️⭐️⭐️☆☆</strong> - Okay phone for the price. Works fine for basic use, but struggles with heavy gaming.</p>
          <p className="text-sm text-gray-500">— Amit K.</p>
        </div>

        <div className="border-b pb-3">
          <p className="text-gray-700"><strong>⭐️⭐️⭐️⭐️☆</strong> - Good design, solid battery backup, and smooth UI. Worth it for budget users.</p>
          <p className="text-sm text-gray-500">— Neha D.</p>
        </div>
      </div>
    )}
  </div>
</div>

 <div className=" container mt-6">
    <h2 className="text-[20px] font-[600] ">
      Related Products

   
    </h2>
    <ProductSlider  items={6}/>
 </div>

    </section>
  );
}

export default ProductDetail;
