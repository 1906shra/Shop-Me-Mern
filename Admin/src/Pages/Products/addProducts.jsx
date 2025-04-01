
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import UploadBox from "../../Components/Upload/upload";

function AddProducts () {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    newPrice: "",
    isFeatured: false,
    stock: "",
    brand: "",
    weight: "",
    size: "",
    rating: "",
    discount: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", product);
    alert("Product added successfully!");
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name & Brand */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Product Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium text-gray-700">Product Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Pricing & Discount */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">New Price (₹)</label>
            <input
              type="number"
              name="newPrice"
              value={product.newPrice}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Stock, Weight & Size */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Rating & Featured */}
        <div className="flex items-center gap-6">
          <div>
            <label className="block font-medium text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured Product
          </label>
        </div>

        {/* Image Upload */}
        <div className="border p-4 rounded-lg">
         <UploadBox/>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProducts;
