import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to handle View Details click
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedCourse(null);
  };

  useEffect(() => {
    fetchCourses(filter);
    // eslint-disable-next-line
  }, [filter]);

  const fetchCourses = async (filter) => {
    const token = sessionStorage.getItem("auth_token");
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/courses?filter=${filter}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error Fetching Courses",
          text: errorData.message || "Failed to fetch data.",
          icon: "error",
        });
        console.error("Error Response:", errorData);
      }
    } catch (error) {
      Swal.fire({
        title: "Error Fetching Courses",
        text: error || "Failed to fetch data.",
        icon: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleEnroll = async (id) => {
    const token = sessionStorage.getItem("auth_token");

    try {
      const response = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          courseid: id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Enrolled successfully!",
          // text: data.message || "Enrolled successfully!",
          icon: "success",
        });
        setFilter("enrolled");
        handleClosePopup();
      } else {
        Swal.fire({
          title: "Error Fetching Courses",
          text: data.error || "Failed to enroll in the course.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("An error occurred while enrolling in the course.");
    }
  };

  return (
    <div className="flex flex-col">
      <p className="py-5 text-center text-2xl font-semibold ">
        {filter === "all"
          ? "All Courses"
          : filter === "enrolled"
          ? "Enrolled Courses"
          : filter === "completed"
          ? "Completed Courses"
          : "Courses"}
      </p>
      {/* Dropdown for filtering */}
      <div className="flex flex-row flex-wrap font-semibold items-center justify-center">
        <label htmlFor="filter">Filter Courses: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-gray-500 rounded-lg items-center mx-1"
        >
          <option value="all">All Courses</option>
          <option value="enrolled">Enrolled</option>
          <option value="completed">Completed</option>
        </select>
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
      <div className="flex justify-around flex-row w-full flex-wrap overflow-x-auto">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.courseid}
              className="p-4 rounded-md shadow-sm flex flex-col justify-start border-gray-700 border-2 m-2 w-2/5"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-700 mb-2">
                Instructor: {course.instructor}
              </p>
              <p className="text-gray-700 mb-2">
                Start Date: {course.start_date}
              </p>
              <p className="text-gray-700 mb-2">
                Duration: {course.duration} Days
              </p>
              <p className="text-gray-700 mb-2">Status: {course.status}</p>
              <button
                onClick={() => handleViewDetails(course)}
                className="bg-primary border-2 border-primary text-white px-4 py-2 rounded-md mt-2 hover:text-primary hover:bg-white transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No courses available at the moment.
          </p>
        )}
      </div>
      {/* Popup Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-4/5 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedCourse.title}</h2>
            <p className="text-gray-700 mb-2">
              Instructor: {selectedCourse.instructor}
            </p>
            <p className="text-gray-700 mb-2">
              Start Date: {selectedCourse.start_date}
            </p>
            <p className="text-gray-700 mb-2">
              Duration: {selectedCourse.duration} Days
            </p>
            <p className="text-gray-700 mb-2">
              Status: {selectedCourse.status}
            </p>
            <p className="text-gray-700 mb-2">
              Description: {selectedCourse.description || "No description"}
            </p>
            <div className="flex flex-row flex-wrap justify-around">
              <button
                onClick={handleClosePopup}
                className="bg-red-500 border-2 border-red-500 hover:text-red-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
              >
                Close
              </button>
              {selectedCourse.status === "Not Enrolled" && (
                <button
                  onClick={() => handleEnroll(selectedCourse.courseid)}
                  className="bg-green-500 border-2 border-green-500 hover:text-green-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
                >
                  Enroll
                </button>
              )}
              {selectedCourse.status === "Enrolled" ||
              selectedCourse.status === "enrolled" ||
              selectedCourse.status === "completed" ||
              selectedCourse.status === "Completed" ? (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Content will be added soon",
                      text: "Content for this course not added so far. Wait for sometimes or contact us",
                      icon: "info",
                    });
                  }}
                  className="bg-green-500 border-2 border-green-500 hover:text-green-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
                >
                  View Course
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
