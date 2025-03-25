import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import img from '../../assets/give.png';
import img1 from '../../assets/bars.png';
import pie from '../../assets/pie-chart.png';
import rev from '../../assets/revenue.png';
function DashCom() {
  return (
    <Swiper
      slidesPerView={4} // Show 3 slides in one row
      spaceBetween={30} 
     
      modules={[Navigation]} 
      className="mySwiper pl-64 mt-8"
    >
      <SwiperSlide>
        <div className="box p-1 rounded-md border border-gray-600 flex items-center gap-2 ">
          <div className="info w-full flex items-center space-x-2">
            <img src="https://cdn-icons-gif.flaticon.com/15576/15576191.gif" alt="" className="w-[20%]" />
            <div className="flex flex-col">
              <h3 className="font-[500]">New Order</h3>
              <b>1543</b>
            </div>
          </div>
          <img src={img1} alt="" className="w-[20%] ml-auto" />
        </div>
      </SwiperSlide>

      
      <SwiperSlide>
        <div className="box p-1 rounded-md border border-gray-600 flex items-center gap-2">
          <div className="info w-full flex items-center space-x-2">
            <img src="https://cdn-icons-gif.flaticon.com/15576/15576162.gif" alt="" className="w-[20%]" />
            <div className="flex flex-col">
              <h3 className="font-[500]">Sales</h3>
              <b>1543</b>
            </div>
          </div>
          <img src={pie} alt="" className="w-[20%] ml-auto" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="box p-1 rounded-md border border-gray-600 flex items-center gap-2">
          <div className="info w-full flex items-center space-x-2">
            <img src="https://cdn-icons-gif.flaticon.com/17904/17904628.gif" alt="" className="w-[20%]" />
            <div className="flex flex-col">
              <h3 className="font-[500]">Revenue</h3>
              <b>1543</b>
            </div>
          </div>
          <img src={rev} alt="" className="w-[20%] ml-auto" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="box p-1 rounded-md border border-gray-600 flex items-center gap-2 mr-2">
          <div className="info w-full flex items-center space-x-2">
            <img src="https://cdn-icons-gif.flaticon.com/17907/17907867.gif" alt="" className="w-[20%]" />
            <div className="flex flex-col">
              <h3 className="font-[500]">Total Products</h3>
              <b>1543</b>
            </div>
          </div>
          <img src={img1} alt="" className="w-[20%] ml-auto" />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default DashCom