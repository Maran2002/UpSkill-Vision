import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";

const RegPassword = ({ setRegPage, setUserPassword }) => {
  const [passwords, setPasswords] = useState({ password: "", repassword: "" });
  const [passwordsError, setPasswordsError] = useState({
    password: "",
    repassword: "",
  });
  const handleRegPasswords = (e) => {
    e.preventDefault();
    if (regPasswordsValidation()) {
      setUserPassword(passwords);
      setRegPage("otp");
    }
  };
  const handleUserPasswords = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPasswordsError((prevData) => ({ ...prevData, [name]: "" }));
  };
  const regPasswordsValidation = () => {
    let Errors = {};
    if (!passwords.password) {
      Errors.password = "Enter a password";
    } else if (
      !/^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9]).{8,}$/.test(passwords.password)
    ) {
      Errors.password = "Enter a secure password";
    }
    if (passwords.password !== passwords.repassword) {
      Errors.repassword = "Passwords must be same";
    }

    setPasswordsError(Errors);
    return Object.keys(Errors).length === 0;
  };
  return (
    <>
      <p className="text-red-500 font-semibold">Register</p>
      <p className="text-5xl font-koulen">Set Password</p>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password" //{passtype ? "text" : "password"}
          placeholder="Enter your password"
          value={passwords.password}
          onChange={handleUserPasswords}
          className="border-2 border-black my-1 rounded-md p-2"
        />
        {passwordsError.password && (
          <p className="text-xs text-red-500 flex flex-col">
            {passwordsError.password}{" "}
          </p>
        )}
        <p className="text-xs text-red-500 flex flex-col">
          {passwords.password && (
            <>
              {!/(?=.*[A-Z])/.test(passwords.password) && (
                <span>Password must contain a uppercase letter</span>
              )}
              {!/(?=.*[@$!%*?&])/.test(passwords.password) && (
                <span>Password must contain a special character</span>
              )}
              {!/(?=.*[0-9])/.test(passwords.password) && (
                <span>Password must contain a number</span>
              )}
              {!/.{8,}/.test(passwords.password) && (
                <span>Password must contain more than 8 character</span>
              )}
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="repassword">Re-enter password</label>
        <input
          id="repassword"
          name="repassword"
          type="password"
          placeholder="Enter your password again"
          value={passwords.repassword}
          onChange={handleUserPasswords}
          className="border-2 border-black my-1 rounded-md p-2"
        />
        {passwordsError.repassword && (
          <p className="text-xs text-red-500 flex flex-col">
            {passwordsError.repassword}{" "}
          </p>
        )}
      </div>
      <button
        onClick={handleRegPasswords}
        className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
      >
        Request OTP
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
};

export default RegPassword;
