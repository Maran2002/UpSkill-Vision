import React from "react";
import { FaHome } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="bg-slate-50">
        <div className="flex justify-center items-center flex-col p-10 md:p-20">
          <p className="uppercase flex text-3xl md:text-4xl font-bold pt-5 mb-5 text-primary border-b-2 border-solid border-red-500 text-center">
            Contact Us
          </p>
          <p className="text-justify font-semibold md:text-center p-8 md:px-40 md:text-lg">
            We’re Always Here for You! Whether you need assistance, have a
            question, or want to share feedback, we are just a message or call
            away. Here’s how you can reach us
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-around items-center">
            <div className="flex flex-col items-center text-center h-60 w-60 md:h-80 md:w-80  bg-white border-2 border-solid rounded-lg p-10 m-5 shadow-xl justify-center">
              <FaHome className="size-14 text-primary" />
              <p className="font-semibold p-3">Address</p>
              <p>No.16,Dubai Cross Street, Dubai,000-000</p>
            </div>
            <div className="flex flex-col items-center text-center h-60 w-60 md:h-80 md:w-80  bg-white border-2 border-solid rounded-lg p-10 m-5 shadow-xl justify-center">
              <FaPhoneVolume className="size-12 text-primary" />
              <p className="font-semibold p-3">Phone</p>
              <p>
                {/* <a> */}
                +91 9876543210
                {/* </a> */}
              </p>
              <p>
                {/* <a> */}
                +91 9988776655
                {/* </a> */}
              </p>
            </div>
            <div className="flex flex-col items-center text-center h-60 w-60 md:h-80 md:w-80  bg-white border-2 border-solid rounded-lg p-10 m-5 shadow-xl justify-center">
              <MdEmail className="size-12 text-primary" />
              <p className="font-semibold p-3">EMail</p>
              {/* <a> */}
              <p>info@upskillvision.in</p>
              <p>contact@upskillvision.in</p>
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
