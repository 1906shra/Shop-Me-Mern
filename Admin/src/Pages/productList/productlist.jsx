import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories/getCategory"); // full URL if not using proxy
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const fetchProducts = async (categoryId = "") => {
    try {
      setLoading(true);
      const url = categoryId
        ? `http://localhost:5000/api/products/category/${categoryId}`
        : "http://localhost:5000/api/products/get";

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCat) {
      fetchProducts(selectedCat);
    } else {
      fetchProducts();
    }
  }, [selectedCat]);

  return (
    <div className="p-4 ml-[60px] ">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>

      {/* Filter by category */}
      <div className="mb-6">
        <label className="font-medium mr-2">Filter by Category:</label>
        <select
          className="border p-2 rounded"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading or error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <img
              src={product.images[0]?.url || "https://via.placeholder.com/200"}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description.slice(0, 60)}...</p>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
