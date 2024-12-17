import React from "react";
import Header from "./Header";
import imgWelcome from "../assests/welcome.png";
// import imgBgDown from "../assests/bg-down.png";

const Welcome = () => {
  return (
    <div>
      <Header />
      <div className="welcomebg bg-cover flex flex-col md:flex-row justify-around transition-all duration-300 ease-in-out">
        <div className="flex flex-col justify-start items-center px-5 pt-10 md:py-20 sm:max-w-sm md:max-w-md md:items-start">
          <p className="text-red-500 font-semibold text-lg ">Welcome</p>
          <p className="text-5xl lg:text-7xl font-koulen">Upskill Vision</p>
          <p className="text-justify pt-5 font-semibold text-lg">
            Our platforms make education accessible anytime, anywhere, breaking
            barriers of location and time
          </p>
        </div>
        <div className="flex justify-center items-center m-5 p-0 md:py-12">
          <img src={imgWelcome} alt="" className="drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
