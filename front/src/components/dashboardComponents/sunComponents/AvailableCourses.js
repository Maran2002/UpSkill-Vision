import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const handleFetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/fetch-courses",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        // Check if the response is okay
        if (response.ok) {
          const data = await response.json();
          Swal.fire({
            title: "Courses Fetched Successfully",
            icon: "success",
          });
          console.log("Fetched Courses:", data.content);
          setCourses(data.content);
        } else {
          // Handle non-OK responses
          const errorData = await response.json();
          Swal.fire({
            title: "Error Fetching Courses",
            text: errorData.message || "Failed to fetch data.",
            icon: "error",
          });
          console.error("Error Response:", errorData);
        }
      } catch (error) {
        // Catch network or other errors
        Swal.fire({
          title: "Request Failed",
          text: error.message,
          icon: "error",
        });
        console.error("Error Fetching Courses:", error.message);
      }
    };

    handleFetchCourses();
  }, []);
  return (
    <div className="flex flex-col">
      <p className="py-5 text-center text-2xl font-semibold ">
        Available Courses
      </p>
      <div className="flex justify-around flex-row w-fit flex-wrap overflow-x-auto">
        {courses ? (
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
              <button className="bg-primary hover:text-primary hover:bg-slate-100 text-white px-4 py-2 rounded transition-all border-2 border-primary">
                Enroll Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCourses;
