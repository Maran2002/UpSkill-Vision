import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import MainDashboard from "./sunComponents/MainDashboard";
import Employees from "./sunComponents/Employees";
import Participants from "./sunComponents/Participants";
import Settings from "./sunComponents/Settings";
// import AvailableCourses from "./sunComponents/AvailableCourses";

const ManagerDashboard = ({
  handleLogout,
  logo,
  name,
  dashboardData,
  setDashboardData,
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const handleClosePopup = () => {
    setSelectedCourse(null);
  };

  const handleFetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fetch-courses", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourses(data.content);
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error Fetching Courses",
          text: errorData.message || "Failed to fetch data.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Request Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    handleFetchCourses();
  }, []);

  const handleFetchEnrolledStudents = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/enrolled-students/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Enrolled Students",
          html: data.content
            ? `<ol>${data.content
                .map((student, index) => `<li>${index + 1}. ${student}</li>`)
                .join("")}</ol>`
            : "No one enrolled",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error Fetching Students",
          text: errorData.message || "Failed to fetch enrolled students.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Request Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-row bg-slate-50 w-full">
        <div className="md:flex flex-col min-w-fit w-1/4 h-screen hidden shadow-xl bg-white">
          <div className="flex flex-row justify-center items-center">
            <img src={logo} alt="" srcSet="" className="size-16 m-2" />
            <div className="flex flex-col p-2 font-koulen">
              <p className="flex items-end text-4xl  text-primary">UPSKILL</p>
              <p className="flex items-start text-2xl  text-red-500">vision</p>
            </div>
          </div>
          <div className="flex flex-col font-koulen h-full items-center justify-center">
            <div className="text-left flex flex-col">
              <button
                onClick={() => setPage("dashboard")}
                type="button"
                className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => setPage("employees")}
                type="button"
                className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
              >
                Employees
              </button>
              <button
                onClick={() => setPage("participants")}
                type="button"
                className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
              >
                Participants
              </button>
              <button
                onClick={() => setPage("courses")}
                type="button"
                className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
              >
                Courses
              </button>
              <button
                onClick={() => setPage("settings")}
                type="button"
                className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
        <div
          className="md:hidden flex p-3 items-center h-max"
          onClick={() => (open ? setOpen(false) : setOpen(true))}
        >
          {!open && <MdMenu className="text-4xl" />}
          {open && <AiOutlineClose className="text-4xl" />}
        </div>
        {open && (
          <div className="md:hidden flex-col min-w-fit w-3/5 h-max absolute rounded-lg bg-slate-50 shadow-xl p-5 top-36 sm:left-1/4 left-5">
            <div className="flex flex-wrap justify-around items-center">
              <div className="flex flex-row justify-center items-center">
                <img src={logo} alt="" srcSet="" className="size-16 m-2" />
                <div className="flex flex-col p-2 font-koulen">
                  <p className="flex items-end text-4xl  text-primary">
                    UPSKILL
                  </p>
                  <p className="flex items-start text-2xl  text-red-500">
                    vision
                  </p>
                </div>
              </div>
              <div className="flex flex-col font-koulen h-full items-center justify-center">
                <div className="text-left flex flex-col">
                  <button
                    onClick={() => {
                      setPage("dashboard");
                      setOpen(false);
                    }}
                    type="button"
                    className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setPage("employees");
                      setOpen(false);
                    }}
                    type="button"
                    className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
                  >
                    Employees
                  </button>
                  <button
                    onClick={() => {
                      setPage("participants");
                      setOpen(false);
                    }}
                    type="button"
                    className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
                  >
                    Participants
                  </button>
                  <button
                    onClick={() => {
                      setPage("courses");
                      setOpen(false);
                    }}
                    type="button"
                    className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => {
                      setPage("settings");
                      setOpen(false);
                    }}
                    type="button"
                    className="hover:text-primary focus:text-primary transition-all duration-300 text-2xl text-left cursor-pointer"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col w-4/5 overflow-x-auto h-screen">
          <div className="flex flex-row flex-wrap items-center justify-around  h-max p-5 ">
            {/* <div className="flex  w-96 rounded-full inner-shadow h-max p-1 items-center m-2">
              <div className="flex flex-row items-center">
                <IoMdSearch className="text-gray-500 size-9 px-2" />
                <p className="text-gray-500">Search here...</p>
              </div>
            </div> */}
            <div className="flex flex-row items-center">
              <p className="font-koulen text-xl">{name}</p>
              <CgProfile className="size-9 px-1" />
            </div>
            <button
              onClick={handleLogout}
              className="m-2 text-lg text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 h-max px-2 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col justify-center items-center font-bold text-4xl uppercase h-max">
            <p className="text-primary">Manager Dashboard</p>
          </div>{" "}
          {/*  Center part content to be added  */}
          {page === "dashboard" ? (
            <MainDashboard
              dashboardData={dashboardData}
              setDashboardData={setDashboardData}
            />
          ) : page === "employees" ? (
            <Employees dashboardData={dashboardData} />
          ) : page === "participants" ? (
            <Participants dashboardData={dashboardData} />
          ) : page === "settings" ? (
            <Settings dashboardData={dashboardData} />
          ) : page === "courses" ? (
            <>
              <div className="flex flex-col">
                <p className="py-5 text-center text-2xl font-semibold">
                  Available Courses
                </p>

                {/* Course List */}
                <div className="flex justify-around flex-row w-fit flex-wrap overflow-x-auto">
                  {courses.length ? (
                    courses.map((course, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-md shadow-sm flex flex-col justify-start border-gray-700 border-2 m-2 w-2/5"
                      >
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          {course[1]}
                        </h2>
                        <p className="text-gray-700 mb-2">
                          <strong>Instructor:</strong> {course[3]}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Description:</strong> {course[2]}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Start Date:</strong> {course[4]}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>End Date:</strong> {course[5]}
                        </p>
                        <div className="flex flex-wrap flex-row justify-around">
                          <button
                            onClick={() => handleViewDetails(course)}
                            className="bg-primary border-2 border-primary text-white px-4 py-2 rounded-md mt-2 hover:text-primary hover:bg-white transition-all duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No courses available at the moment.
                    </p>
                  )}
                </div>

                {selectedCourse && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-4/5 md:w-1/3">
                      <h2 className="text-xl font-bold mb-4">
                        {selectedCourse[1]}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        Instructor: {selectedCourse[3]}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Start Date: {selectedCourse[4]}
                      </p>
                      <p className="text-gray-700 mb-2">
                        End Date: {selectedCourse[5]}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Duration: {selectedCourse[7]} Days
                      </p>
                      <p className="text-gray-700 mb-2">
                        Description: {selectedCourse[2] || "No description"}
                      </p>
                      <div className="flex flex-row flex-wrap justify-around">
                        <button
                          onClick={() =>
                            handleFetchEnrolledStudents(selectedCourse[0])
                          }
                          className="bg-green-500 border-2 border-green-500 hover:text-green-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
                        >
                          Enrolled Students
                        </button>
                        <button
                          onClick={handleClosePopup}
                          className="bg-red-500 border-2 border-red-500 hover:text-red-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>Some Error Occured</>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
