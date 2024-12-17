import { FiArrowLeftCircle } from "react-icons/fi";
const OTP = ({ otp, setOtp, otpError, setOtpError, handleOTP, onBack }) => (
  <>
    <p className="text-red-500 font-semibold">Login</p>
    <p className="text-5xl font-koulen">Verify Your Account</p>
    <form onSubmit={handleOTP} className="font-lg font-semibold py-5">
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
            setOtpError("");
          }}
          placeholder="Enter your otp"
          className="border-2 border-black my-1 rounded-md p-2"
        />
        {otpError && <p className="text-xs text-red-500">{otpError}</p>}
      </div>

      <div>
        <p className="px-2 py-10">
          By signing in, you are agreeing to our
          <br /> terms and conditions
        </p>
      </div>
      <button
        onClick={handleOTP}
        className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
      >
        Submit
      </button>
      <div
        onClick={onBack}
        className="cursor-pointer flex flex-row justify-center items-center m-3"
      >
        <FiArrowLeftCircle />
        <p>Back</p>
      </div>
    </form>
  </>
);
export default OTP;
