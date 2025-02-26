import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  "https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg",
  "https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg",
  "https://api.spicezgold.com/download/file_1734529918447_miss-ayse-women-s-multicolor-crepe-printed-top-product-images-rvvlrud6qm-0-202410111253.webp",
  "https://api.spicezgold.com/download/file_1734772189809_op-nord-ce-3-lite-128-gb-8-gb-ram-pastel-lime-mobile-phone-digital-o493666102-p608711337-0-202404091704.webp",
  "https://api.spicezgold.com/download/file_1734774941574_e6mcHGzb_51e00e276f0744eebaf91c9a7b2b15aa.jpg",
  "https://api.spicezgold.com/download/file_1734527242808_fabbmate-casual-sports-shoes-white-sneakers-for-women-girls-white-shoes-product-images-rvouh9agls-0-202406162001.webp",
  "https://sslimages.shoppersstop.com/sys-master/images/h47/hb5/33443640573982/AA24SEREN169260_GREY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/h79/ha6/33358020444190/A24346DR60BK_BLACK.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
  "https://sslimages.shoppersstop.com/sys-master/images/hd9/hd2/32456671625246/S24THHWBG265_NAVY.jpg_2000Wx3000H",
];

function HomeCatSlider() {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto p-5">
      {/* Left Navigation Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black text-white rounded-full shadow-lg"
      >
        <ArrowLeft size={15} />
      </button>

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Navigation]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="relative group w-[250px] h-[300px] bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:scale-105">
              {/* Image */}
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black text-white rounded-full shadow-lg"
      >
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default HomeCatSlider;
