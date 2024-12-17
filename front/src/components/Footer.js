import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-center items-center text-white p-2 pt-4">
        <p className=" text-xl md:text-4xl font-koulen">
          Education Empowers Transformation
        </p>
      </div>

      <hr className="border-2 border-solid border-white border-b-0 w-4/5 mx-auto" />
      <div className="text-white flex flex-col justify-center items-center p-1 pb-3">
        <p className="">&#169; 2024 UpSkill Vision. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
