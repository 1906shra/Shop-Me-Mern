import React, { useState, useRef } from 'react';
import { X, UploadCloud, Loader } from 'lucide-react';

function Upload({ categoryId, onImageUpload }) {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...filePreviews]);

    uploadImages(files);
  };

  const uploadImages = async (imagesToUpload) => {
    if (!imagesToUpload.length) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", imagesToUpload[0]); // Assume one image upload at a time

      const response = await fetch(`${BASE_URL}/api/categories/uploadImage/${categoryId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Upload failed");

      // After successful upload, pass the image URL to the parent component
      onImageUpload(data.image.url);

      // Update the preview with the uploaded image's URL
      setPreviews([
        {
          file: imagesToUpload[0],
          url: data.image.url,
        },
      ]);

      alert("✅ Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white">
      <div
        className="border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 transition rounded-xl p-8 text-center cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <UploadCloud className="mx-auto text-blue-500" size={40} />
        <p className="mt-2 text-gray-700 font-medium">Click or drag & drop to upload</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {isUploading && (
        <div className="mt-4 text-center text-gray-700">
          <Loader className="mx-auto animate-spin" size={24} />
          <p>Uploading image...</p>
        </div>
      )}

      {previews.length > 0 && !isUploading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative w-full h-28 rounded-xl overflow-hidden shadow-sm">
              <img
                src={preview.url}
                alt={`Preview ${idx}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upload;
