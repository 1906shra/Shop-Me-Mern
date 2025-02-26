import React, { useState, useEffect } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/CatSlider";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment, MdOutlineVerified } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";

function Home() {
  const calculateTimeLeft = () => {
    const offerEndTime = new Date().setHours(new Date().getHours() + 5, 0, 0); // Offer ends in 5 hours
    const now = new Date().getTime();
    const difference = offerEndTime - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <HomeSlider />
      <section className="py-2 bg-gray-100 flex justify-center items-center">
        <div className="container text-center p-4 bg-white shadow-lg rounded-lg border text-[#FF3D3D]">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Limited Time Offer! 🔥</h2>
          <p className="text-gray-600 text-lg">Hurry up! Offer ends in:</p>
          <div className="flex justify-center items-center gap-4 text-2xl font-semibold mt-4 text-[#FF3D3D]">
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.hours}</span>
              <span className="text-sm text-gray-500">Hours</span>
            </div>
            <span className="text-4xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-500">Minutes</span>
            </div>
            <span className="text-4xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-500">Seconds</span>
            </div>
          </div>
          <button className="mt-6 text-[#FF3D3D]  px-6 py-2 rounded-lg font-semibold hover:text-red-400 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-gray-100 flex justify-center items-center">
        <div className="container flex flex-wrap md:flex-nowrap justify-between items-center px-10 gap-5">
          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-red-500 rounded-lg shadow-md">
            <FaShippingFast className="text-3xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-600">For Plus Members on all orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-green-500 rounded-lg shadow-md">
            <MdOutlineVerified className="text-3xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">100% Genuine Products</h3>
              <p className="text-sm text-gray-600">Quality assured by top brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-blue-500 rounded-lg shadow-md">
            <MdOutlinePayment className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-600">Multiple safe payment options</p>
            </div>
          </div>
        </div>
      </section>


      <HomeCatSlider />

      {/* Offer Countdown Section */}
    </>
  );
}

export default Home;
