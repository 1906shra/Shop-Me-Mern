import React, { useState } from "react";
import { X } from "lucide-react"; // Importing an icon for delete

function UploadBox() {
  const [images, setImages] = useState([null]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          if (!newImages.includes(null)) {
            newImages.push(null);
          }
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      if (newImages.length === 0 || !newImages.includes(null)) {
        newImages.push(null);
      }
      return newImages;
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg w-80 relative"
        >
          <label className="cursor-pointer w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event, index)}
            />
            <div className="p-4 text-center text-gray-600 relative">
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-40 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <p>Click to upload an image</p>
              )}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default UploadBox;