import React, { useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";

const images = [
  "https://api.spicezgold.com/download/file_1734527098974_poco-c61-4gb-ram-64gb-rom-ethereal-blue-smartphone-product-images-orvmh0bwivm-p608625324-0-202403291512.webp",
  "https://api.spicezgold.com/download/file_1734527098974_poco-c61-4gb-ram-64gb-rom-ethereal-blue-smartphone-product-images-orvmh0bwivm-p608625324-1-202403291512.jpg",
  
];

function ProductZoom() {
  const swiperRef = useRef(null);
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-6">
      {/* Zoomable Product Image */}
      <div className="w-full max-w-[450px] flex justify-center">
        <InnerImageZoom
          zoomType="hover"
          zoomScale={2}
          src={selectedImage}
          className="rounded-lg shadow-lg border border-gray-300"
        />
      </div>

      {/* Swiper Image Slider - Thumbnails */}
      <div className="w-full max-w-[450px]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={3} // Show 3 images on small screens
          spaceBetween={10}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 4 }, // 4 images on medium screens
            1024: { slidesPerView: 5 }, // 5 images on large screens
          }}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className={`p-2 border rounded-lg shadow-md cursor-pointer transition ${
                  selectedImage === image ? "border-blue-500 scale-105" : "border-gray-300 hover:scale-105"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt="Product" className="rounded-md w-full h-20 object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductZoom;
