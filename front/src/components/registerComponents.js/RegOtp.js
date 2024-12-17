import React, { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegOtp = ({ setRegPage, userPassword, userDetails, setLoading }) => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    const sendOtpRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:5000/registration-otp-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
          }
        );
        const result = await response.json();

        if (response.ok) {
          setOtpSent(true);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try after sometime",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    sendOtpRequest(); // Call the async function
    // eslint-disable-next-line
  }, []); // Dependency array remains the same

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:5000/verify-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userDetails, ...userPassword, otp }),
        }
      );
      const result = await response.json();
      sessionStorage.setItem("token", result.token);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Registration completed successfully, You will be redirected now!",
        });
        navigate("/dashboard");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Enter a valid OTP or Please try after sometime",
      });
    } finally {
      setLoading(false);
    }
  };
  if (otpSent) {
    return (
      <>
        <p className="text-red-500 font-semibold">Register</p>
        <p className="text-5xl font-koulen">Verify Your Mail</p>
        <div>
          <p className="py-10 text-green-600">
            OTP has been successfully send to your Email
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter your otp"
            className="border-2 border-black my-1 rounded-md p-2"
          />
          {otp && (
            <p className="text-xs text-red-500">
              {!/^\d{6}$/.test(otp) && "Enter a valid OTP"}
            </p>
          )}
        </div>

        <div>
          <p className="px-2 py-10">
            By signing in, you are agreeing to our
            <br /> terms and conditions
          </p>
        </div>
        <button
          onClick={handleRegistration}
          className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
        >
          Submit
        </button>
        <div
          onClick={() => setRegPage("details")}
          className="cursor-pointer flex flex-row justify-center items-center m-3"
        >
          <FiArrowLeftCircle />
          <p>Back</p>
        </div>
      </>
    );
  }
};

export default RegOtp;
