import { FiArrowLeftCircle } from "react-icons/fi";
import Swal from "sweetalert2";
const ForgotPassword = ({
  email,
  setEmail,
  onBack,
  emailPresence,
  otp,
  setOtp,
  verifyMail,
  verifyOtp,
  otpPresence,
  forgetPassword,
  handleForgetPassword,
  handlePassword,
}) => (
  <>
    <p className="text-red-500 font-semibold">Forget Password</p>

    {!otpPresence && (
      <>
        <p className="text-5xl font-koulen">Verify Your Account</p>
        <form action="">
          {" "}
          <div className="flex flex-col">
            <label htmlFor="email">EMail</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black my-1 rounded-md p-2"
            />
            {!email ||
              (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                email
              ) && (
                <p className="text-xs text-red-500">
                  Enter a valid Mail address
                </p>
              ))}
          </div>
          {!emailPresence && (
            <button
              onClick={verifyMail}
              className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
            >
              Next
            </button>
          )}
          {emailPresence && (
            <>
              {" "}
              <div>
                <p className="py-5 text-green-600">
                  OTP has been successfully send to your Email
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="otp">Otp</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter your otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-2 border-black my-1 rounded-md p-2"
                />
                {!otp ||
                  (!/^\d{6}$/.test(otp) && (
                    <p className="text-xs text-red-500">Enter a valid otp</p>
                  ))}
              </div>
              <button
                onClick={verifyOtp}
                className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </>
    )}
    {otpPresence && (
      <>
        <p className="text-5xl font-koulen">Set Password</p>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password" //{passtype ? "text" : "password"}
            placeholder="Enter your password"
            value={forgetPassword.password}
            onChange={handleForgetPassword}
            className="border-2 border-black my-1 rounded-md p-2"
          />
          {/* <button onClick={setPasstype(!passtype)}>
              {passtype ? "hide" : "show"}
            </button> */}

          <p className="text-xs text-red-500 flex flex-col">
            {!forgetPassword.password && <span>Enter any password</span>}
            {forgetPassword.password && (
              <>
                {!/(?=.*[A-Z])/.test(forgetPassword.password) && (
                  <span>Password must contain a uppercase letter</span>
                )}
                {!/(?=.*[@$!%*?&])/.test(forgetPassword.password) && (
                  <span>Password must contain a special character</span>
                )}
                {!/(?=.*[0-9])/.test(forgetPassword.password) && (
                  <span>Password must contain a number</span>
                )}
                {!/.{8,}/.test(forgetPassword.password) && (
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
            value={forgetPassword.repassword}
            onChange={handleForgetPassword}
            className="border-2 border-black my-1 rounded-md p-2"
          />

          {forgetPassword.password !== forgetPassword.repassword && (
            <p className="text-xs text-red-500">Password must be same</p>
          )}
        </div>
        <button
          onClick={() => {
            if (
              forgetPassword.repassword &&
              forgetPassword.repassword === forgetPassword.password
            ) {
              handlePassword();
            } else {
              Swal.fire({
                icon: "error",
                title: "Password Error",
                text: "Password must be same and valid",
              });
            }
          }}
          className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
        >
          Submit
        </button>
      </>
    )}

    <div
      onClick={onBack}
      className="cursor-pointer flex flex-row justify-center items-center m-3"
    >
      <FiArrowLeftCircle />
      <p>Back</p>
    </div>
  </>
);
export default ForgotPassword;
