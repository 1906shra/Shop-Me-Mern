import React from "react";
import { Link } from "react-router-dom"; // ✅ Import from React Router

import image1 from "../../assets/playstation.png";
import image2 from "../../assets/womenCollections.png";
import image3 from "../../assets/perfume.png";
import image4 from "../../assets/speakers.png";

const NewArrival = () => {
  return (
    <div className="flex flex-col my-24 mx-auto">
      <div className="mx-2">
        <h2 className="text-2xl md:text-3xl font-semibold mb-14">New Arrivals</h2>
      </div>
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Large Image on Left */}
        <div className="bg-black rounded md:pt-12 md:px-8 md:h-[600px] md:w-[570px]">
          <div className="text-white relative flex gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row md:w-[511px] md:h-[511px] sm:h-[500px] h-[380px]">
            <div className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover">
              <img
                src={image1}
                alt="New Arrival 1"
                className="w-full h-full transition-transform duration-300 transform hover:-translate-y-4 hover:scale-101 hover:motion-safe:animate-pulse opacity-50 hover:opacity-100"
              />
            </div>
            <div className="flex transform flex-col gap-1 md:gap-4 mt-auto md:mr-auto  w-[270px] md:mb-8  items-center md:items-start justify-end">
              <h2 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter">Featured Product</h2>
              <p className="text-center md:text-start text-sm ">$XX.XX</p>
            </div>
          </div>
        </div>

        {/* Smaller Images on Right (Aligned to the right of larger image) */}
        <div className="flex flex-col gap-8">
          {/* Image 2 */}
          <div className="bg-black rounded h-[284px] md:w-[570px]">
            <div className="text-white relative flex items-center justify-center flex-col-reverse md:flex-row w-full h-full">
              <div className="overflow-hidden absolute bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105 p-15 py-20">
                <img
                  src={image2}
                  alt="New Arrival 2"
                  className="w-full h-full max-w-[400px] transition-transform duration-300 transform hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                />
              </div>
              <div className="flex transform flex-col gap-1 md:gap-4 mt-auto md:mr-auto md:pl-8 md:pb-4 items-center w-[270px]">
                <h3 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter">Product 2</h3>
                <p className="text-center md:text-start text-sm">$XX.XX</p>
                <div className="text-center mt-2">
                  
                </div>
              </div>
            </div>
          </div>

          {/* Images 3 and 4 in the Same Row */}
          <div className="flex gap-8">
            {/* Image 3 */}
            <div className="bg-black rounded md:px-6 h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className="text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px]">
                <div className="px-16 py-4 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105">
                  <img
                    src={image3}
                    alt="New Arrival 3"
                    className="w-full h-full max-w-[400px] transition-transform duration-300 transform hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                  />
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                  <h3 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter">Product 3</h3>
                  <p className="text-center md:text-start text-sm">$XX.XX</p>
                  
                </div>
              </div>
            </div>

            {/* Image 4 */}
            <div className="bg-black rounded md:px-6 h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className="text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px]">
                <div className="px-16 py-8 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105">
                  <img
                    src={image4}
                    alt="New Arrival 4"
                    className="w-full h-full max-w-[400px] transition-transform duration-300 transform hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                  />
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                  <h3 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter">Product 4</h3>
                  <p className="text-center md:text-start text-sm">$XX.XX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
