import React, { useState } from "react";
import UploadBox from "../../Components/Upload/upload";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  subCategory: "",
  productSize: [],
  productWeight: [],
  discount: "",
  stock: "",
  brand: "",
  location: {
    value: "",
    label: "",
  },
  images: [],
};

function AddProduct() {
  const [formData, setFormData] = useState(initialForm);
  const [productSizeInput, setProductSizeInput] = useState("");
  const [productWeightInput, setProductWeightInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayInput = (value, field) => {
    const array = value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    setFormData((prev) => ({
      ...prev,
      [field]: array,
    }));
  };

  const handleImageUpload = (images) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      return alert("Please fill all required fields.");
    }

    if (!formData.images.length) {
      return alert("Please upload at least one product image.");
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        discount: Number(formData.discount) || 0,
        brand: formData.brand || "Generic",
      };

      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong.");

      alert("Product added successfully!");
      setFormData(initialForm);
      setProductSizeInput("");
      setProductWeightInput("");
    } catch (err) {
      console.error("Error:", err);
      alert(err.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (MongoDB ID)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="subCategory"
          placeholder="Subcategory"
          value={formData.subCategory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Product Sizes (e.g. S, M, L)"
          value={productSizeInput}
          onChange={(e) => {
            setProductSizeInput(e.target.value);
            handleArrayInput(e.target.value, "productSize");
          }}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Product Weights (e.g. 500g, 1kg)"
          value={productWeightInput}
          onChange={(e) => {
            setProductWeightInput(e.target.value);
            handleArrayInput(e.target.value, "productWeight");
          }}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={formData.discount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location.value"
          placeholder="Location Value (e.g. City)"
          value={formData.location.value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location.label"
          placeholder="Location Label"
          value={formData.location.label}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <UploadBox onUpload={handleImageUpload} />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
