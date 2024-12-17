const Authenticate = ({
  handleLogin,
  errors,
  handleChange,
  formData,
  onForgotPassword,
  navigate,
}) => (
  <>
    <p className="text-red-500 font-semibold">Login</p>
    <p className="text-6xl font-koulen">Welcome Back</p>
    <form onSubmit={handleLogin} className="font-lg font-semibold py-5">
      <div className="flex flex-col">
        <label htmlFor="email">EMail</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter your mail"
          value={formData.email}
          onChange={handleChange}
          className="border-2 border-black my-1 rounded-md p-2"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="border-2 border-black my-1 rounded-md p-2"
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>
      <div>
        <p className="px-2 py-10">
          By signing in, you are agreeing to our
          <br /> terms and conditions
        </p>
      </div>
      <button
        type="submit"
        className="border-2 border-primary hover:text-primary duration-300 bg-secondary hover:bg-white transition-all my-1 rounded-md p-2 w-full"
      >
        Sign In
      </button>
    </form>
    <div className="flex flex-col justify-center items-center font-semibold">
      <p className="text-primary">
        Don't have account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-red-500 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
      <p className="text-red-500 cursor-pointer" onClick={onForgotPassword}>
        Forgot Password?
      </p>
    </div>
  </>
);
export default Authenticate;
