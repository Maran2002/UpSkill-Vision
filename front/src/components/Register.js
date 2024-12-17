import React, { useState } from "react";
import Header from "./Header";
import { DNA } from "react-loader-spinner";
import bgRegister from "../assests/register.png";
import RegDetails from "./registerComponents.js/RegDetails";
import RegOtp from "./registerComponents.js/RegOtp";
import RegPassword from "./registerComponents.js/RegPassword";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [regPage, setRegPage] = useState("details");
  const [userDetails, setUserDetails] = useState({});
  const [userPassword, setUserPassword] = useState({});
  return (
    <>
      <Header />
      <div className="flex w-full transition-all duration-300 ease-in-out">
        <div className="flex flex-col-reverse sm:flex-row bg-white w-full">
          <div className="flex items-center justify-center w-full sm:w-1/2 h-full">
            <div className="p-3">
              {regPage === "details" && (
                <RegDetails
                  setRegPage={setRegPage}
                  setUserDetail={setUserDetails}
                />
              )}
              {regPage === "password" && (
                <RegPassword
                  setRegPage={setRegPage}
                  setUserPassword={setUserPassword}
                />
              )}
              {regPage === "otp" && (
                <RegOtp
                  setRegPage={setRegPage}
                  userPassword={userPassword}
                  userDetails={userDetails}
                  setLoading={setLoading}
                />
              )}
            </div>
          </div>
          {loading && (
            <div className="overlay">
              <DNA
                visible={true}
                height="100"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          )}

          <div className="sm:flex hidden w-full sm:w-1/2 bg-slate-50 h-full items-start">
            <img
              src={bgRegister}
              alt=""
              srcSet=""
              className="size-fit xl:px-32 xl:py-16 lg:px-24 lg:py-12 md:px-16 py-8"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
