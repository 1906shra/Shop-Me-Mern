import React, { useState, useEffect } from "react";
import Upload from "./categoryUpload"; // Image upload component

const initialCategory = {
  name: "",
  parentCatId: "",
};

function AddCategory() {
  const [formData, setFormData] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null); // Track created category ID
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState("");
  const [categoryImage, setCategoryImage] = useState(null); // Store the uploaded image URL

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories/getCategory");
      const data = await res.json();
      setAllCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return setError("Category name is required");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/categories/createCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create category");

      alert("Category created successfully!");
      setCategoryId(data._id); // Set the created category ID
      setFormData(initialCategory);
      fetchCategories(); // Re-fetch categories after adding new one
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const handleImageUpload = async ({ url, public_id }) => {
  setCategoryImage(url);

  try {
    setLoading(true);

    const res = await fetch(`http://localhost:5000/api/categories/updateCategory/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: [{ url, public_id }],
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update category with image");

    alert("✅ Category updated with image!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to update category with image");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
          required
        />

        <select
          name="parentCatId"
          value={formData.parentCatId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          <option value="">-- Select Parent Category (optional) --</option>
          {allCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      {categoryId && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Upload Image for this Category
          </h3>
          <Upload categoryId={categoryId} onImageUpload={handleImageUpload} />
        </div>
      )}
    </div>
  );
}

export default AddCategory;
