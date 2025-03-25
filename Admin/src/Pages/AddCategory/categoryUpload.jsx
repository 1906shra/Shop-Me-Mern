import React, { useState, lazy, Suspense } from 'react';


import { X } from "lucide-react"; // Importing an icon for delete
import UploadBox from "../../Components/Upload/upload";

function CategoryUpload() {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!categoryName || !image) {
      alert('Please provide a category name and an image.');
      return;
    }
    
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('image', image);
    
    // Handle form submission (e.g., send data to backend)
    console.log('Uploading:', categoryName, image);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg max-w-lg mx-auto bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Upload Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
          <UploadBox/>
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Category Upload
        </button>
      </form>
    </div>
  );
}

export default CategoryUpload;
