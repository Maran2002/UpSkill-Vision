import { useState } from "react";
import bglogin from "../assests/login.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Authenticate from "./loginComponents/Authenticate";
import OTP from "./loginComponents/OTP";
import ForgotPassword from "./loginComponents/ForgotPassword";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [emailPresence, setEmailPresence] = useState(false);
  const [otpPresence, setOtpPresence] = useState(false);
  const [forgetOtp, setForgetOtp] = useState("");
  const [forgetPassword, setForgetPassword] = useState({
    password: "",
    repassword: "",
  });
  const [loading, setLoading] = useState(false);
  // const [passtype, setPasstype] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({ ...prevData, [name]: "" }));
  };
  const handleForgetPassword = (e) => {
    const { name, value } = e.target;
    setForgetPassword((prevData) => ({ ...prevData, [name]: value }));
  };
  const formValidation = () => {
    let newErrors = {};
    if (
      !formData.email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid mail address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        setLoading(true);
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }

        const response = await fetch(
          "http://127.0.0.1:5000/login-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Send JSON data
          }
        );

        const result = await response.json();

        if (response.ok) {
          setStep("otp");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Try using correct password or try after sometime",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const handleOTP = async (e) => {
    e.preventDefault();
    let otpErrors = "";
    if (!otp || !/^\d{6}$/.test(otp)) {
      otpErrors = "Enter a vaild otp";
    }
    setOtpError(otpErrors);
    if (otpErrors.length === 0) {
      //
      try {
        const response = await fetch("http://127.0.0.1:5000/api/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email: formData.email }), // Send JSON data
        });

        const result = await response.json();
        localStorage.setItem("token", result.token);
        sessionStorage.setItem("auth_token", result.token);
        if (response.ok) {
          // Swal.fire({
          //   icon: "success",
          //   title: "Login Successfull",
          // });
          navigate("/dashboard");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "OTP Error",
          text: "please enter a valid otp",
        });
      }
    }
  };
  const verifyMail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/verify-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send JSON data
      });

      const result = await response.json();

      if (response.ok) {
        setEmailPresence(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Email Not Exists",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: forgetOtp, email }), // Send JSON data
      });

      const result = await response.json();
      if (response.ok) {
        setOtpPresence(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "OTP Error",
        text: "please enter a valid otp",
      });
    }
  };
  const handlePassword = async () => {
    // navigate("/dashboard");
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...forgetPassword, email }), // Send JSON data
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password updated!",
          text: "Password updated successfully, Please login to continue.",
        });
        navigate("/");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Some error occured, Please try after sometime!",
      });
    }
  };
  const renderStep = (step) => {
    switch (step) {
      case "login":
        return (
          // <>login</>
          <Authenticate
            handleLogin={handleLogin}
            errors={errors}
            handleChange={handleChange}
            formData={formData}
            onForgotPassword={() => setStep("forgotPassword")}
            navigate={navigate}
          />
        );

      case "otp":
        return (
          // <>otp</>
          <OTP
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            setOtpError={setOtpError}
            handleOTP={handleOTP}
            onBack={() => setStep("login")}
          />
        );

      case "forgotPassword":
        return (
          // <>forget pass</>
          <ForgotPassword
            email={email}
            setEmail={setEmail}
            onBack={() => setStep("login")}
            emailPresence={emailPresence}
            otp={forgetOtp}
            setOtp={setForgetOtp}
            verifyMail={verifyMail}
            verifyOtp={verifyOtp}
            otpPresence={otpPresence}
            forgetPassword={forgetPassword}
            handleForgetPassword={handleForgetPassword}
            // passtype={passtype}
            // setPasstype={setPasstype}
            handlePassword={handlePassword}
          />
        );

      default:
        return <>error</>;
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="flex w-full transition-all duration-300 ease-in-out">
        <div className="flex flex-col-reverse sm:flex-row bg-white w-full">
          <div className="flex items-center justify-center w-full sm:w-1/2 h-full">
            <div className="p-3">{renderStep(step)}</div>
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
              src={bglogin}
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

export default Login;
