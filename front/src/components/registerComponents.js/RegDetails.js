import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegDetails = ({ setRegPage, setUserDetail }) => {
  const navigate = useNavigate();
  const handleRegDetails = (e) => {
    e.preventDefault();
    if (regFormValidation()) {
      setUserDetail(userDetails);
      setRegPage("password");
    }
  };
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });
  const [userDetailsError, setUserDetailsError] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });
  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUserDetailsError((prevData) => ({ ...prevData, [name]: "" }));
  };
  const regFormValidation = () => {
    let newErrors = {};
    if (
      !userDetails.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        userDetails.email
      )
    ) {
      newErrors.email = "Enter a valid mail address";
    }
    if (!userDetails.name || !/^[A-Za-z]{3,}$/.test(userDetails.name)) {
      newErrors.name = "Name must be at least 3 letters long";
    }
    if (!userDetails.phone || !/^[6-9]\d{9}$/.test(userDetails.phone)) {
      newErrors.phone = "Enter a valid Mobile number";
    }
    if (!userDetails.designation) {
      newErrors.designation = "Please select a designation";
    }
    setUserDetailsError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <p className="text-red-500 font-semibold">Register</p>
      <p className="text-6xl font-koulen">Get started Now</p>
      <form onSubmit={handleRegDetails} className="font-lg font-semibold py-5">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={userDetails.name}
            onChange={handleUserDetails}
            className="border-2 border-black my-1 rounded-md p-2"
          />
          {userDetailsError.name && (
            <p className="text-xs text-red-500">{userDetailsError.name}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">EMail</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your mail"
            value={userDetails.email}
            onChange={handleUserDetails}
            className="border-2 border-black my-1 rounded-md p-2"
          />
          {userDetailsError.email && (
            <p className="text-xs text-red-500">{userDetailsError.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone">Mobile Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your mobile number"
            value={userDetails.phone}
            onChange={handleUserDetails}
            className="border-2 border-black my-1 rounded-md p-2"
          />
          {userDetailsError.phone && (
            <p className="text-xs text-red-500">{userDetailsError.phone}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={userDetails.designation}
            onChange={handleUserDetails}
            className="border-2 border-black my-1 rounded-md p-2"
          >
            <option value="">Please select</option>
            <option value="hradmin">HR Admin</option>
            <option value="manager">Manager</option>
            <option value="instructor">instructor</option>
            <option value="participant">Participant</option>
          </select>
          {userDetailsError.designation && (
            <p className="text-xs text-red-500">
              {userDetailsError.designation}
            </p>
          )}
        </div>

        <div>
          <p className="px-2 py-3">
            By signing up, you are agreeing to our
            <br /> terms and conditions
          </p>
        </div>
        <button
          type="submit"
          className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
        >
          Next
        </button>
      </form>
      <div className="flex flex-col justify-center items-center font-semibold">
        <p className="text-primary">
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </>
  );
};

export default RegDetails;
