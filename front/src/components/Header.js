import { Link } from "react-router-dom";
import logo from "../assests/256 icon.png";
const Header = () => {
  return (
    <>
      <header className="flex flex-col md:justify-around items-center sm:flex-row h-fit lg:bg-white bg-slate-50 ">
        <div className="flex flex-row p-2 pb-0 sm:pb-2 lg:w-1/2 justify-center lg:pt-5">
          <img src={logo} alt="" srcSet="" className="size-16 m-2" />
          <div className="flex flex-col p-2 font-koulen">
            <p className="flex items-end text-4xl  text-primary">UPSKILL</p>
            <p className="flex items-start text-2xl  text-red-500">vision</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center lg:w-1/2 lg:bg-slate-50 sm:h-32 lg:pt-5">
          <Link
            className="p-2 sm:p-3 focus:text-primary hover:text-primary transition-all font-koulen text-lg md:text-2xl cursor-pointer duration-300"
            to="/"
          >
            Home
          </Link>
          <Link
            className="p-2 sm:p-3 focus:text-primary hover:text-primary transition-all font-koulen text-lg md:text-2xl cursor-pointer duration-300"
            to="/about"
          >
            About Us
          </Link>
          <Link
            className="p-2 sm:p-3 focus:text-primary hover:text-primary transition-all font-koulen text-lg md:text-2xl cursor-pointer duration-300"
            to="/contact"
          >
            Contact Us
          </Link>
          <Link
            className="p-2 sm:p-3 focus:text-primary hover:text-primary transition-all font-koulen text-lg md:text-2xl cursor-pointer duration-300"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="p-2 sm:p-3 focus:text-primary hover:text-primary transition-all font-koulen text-lg md:text-2xl cursor-pointer duration-300"
            to="/login"
          >
            Login
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
