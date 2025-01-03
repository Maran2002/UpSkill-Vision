import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AvailableCourses = ({ updateTrigger, dashboardData, name }) => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourseData, setEditedCourseData] = useState({
    name: "",
    instructor: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [enrolledStudents, setEnrolledStudents] = useState([]);

  const instructorNames =
    dashboardData && Array.isArray(dashboardData)
      ? dashboardData
          .filter((entry) => entry[4] === "instructor" && entry[1] === 1) // Filter where the 4th value is "instructor"
          .map((entry) => entry[3])
      : [];

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
  }, [updateTrigger]);

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete-course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCourses(courses.filter((course) => course[0] !== courseId));
        Swal.fire({
          title: "Course Deleted",
          icon: "success",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error Deleting Course",
          text: errorData.message || "Failed to delete course.",
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

  // Handle course editing
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setEditedCourseData({
      name: course[1],
      instructor: course[3],
      description: course[2],
      startDate: course[4],
      endDate: course[5],
      duration: course[7],
    });
  };

  const handleUpdateCourse = async () => {
    const token = sessionStorage.getItem("auth_token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/update-course/${editingCourse[0]}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...editedCourseData, token }),
        }
      );

      if (response.ok) {
        const updatedCourse = await response.json();
        setCourses(
          courses.map((course) =>
            course[0] === editingCourse[0] ? updatedCourse : course
          )
        );
        setEditingCourse(null);
        handleFetchCourses();
        Swal.fire({
          title: "Course Updated",
          icon: "success",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error Updating Course",
          text: errorData.message || "Failed to update course.",
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

  // Fetch enrolled students
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
        // setEnrolledStudents(data.content);
        // let count = 0;
        Swal.fire({
          title: "Enrolled Students",
          html: data.content
            ? `<ol>${data.content
                .map((student, index) => `<li>${index + 1}. ${student}</li>`)
                .join("")}</ol>`
            : "No one enrolled",
        });
        console.log(data.content);
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
          <p className="text-gray-500">No courses available at the moment.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-4/5 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedCourse[1]}</h2>
            <p className="text-gray-700 mb-2">
              Instructor: {selectedCourse[3]}
            </p>
            <p className="text-gray-700 mb-2">
              Start Date: {selectedCourse[4]}
            </p>
            <p className="text-gray-700 mb-2">End Date: {selectedCourse[5]}</p>
            <p className="text-gray-700 mb-2">
              Duration: {selectedCourse[7]} Days
            </p>
            <p className="text-gray-700 mb-2">
              Description: {selectedCourse[2] || "No description"}
            </p>
            <div className="flex flex-row flex-wrap justify-around">
              <button
                onClick={() => handleEditCourse(selectedCourse)}
                className="bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(selectedCourse[0])}
                className="bg-yellow-500 border-2 border-yellow-500 hover:text-yellow-500 hover:bg-white transition-all duration-300 text-white px-4 py-2 rounded-md mt-4"
              >
                Delete
              </button>
              <button
                onClick={() => handleFetchEnrolledStudents(selectedCourse[0])}
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

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl mb-4">Edit Course</h2>
            <label>
              Name:
              <input
                type="text"
                value={editedCourseData.name}
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    name: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label>
              Instructor:
              <select
                id="instructor"
                value={editedCourseData.instructor}
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    instructor: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select an Instructor
                </option>
                {instructorNames && instructorNames.length !== 0 ? (
                  instructorNames.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option>{name}</option>
                )}
              </select>
            </label>
            <label>
              Description:
              <textarea
                value={editedCourseData.description}
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    description: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label>
              Start Date:
              <input
                type="date"
                value={editedCourseData.startDate}
                onChange={(e) => {
                  const startDateObj = new Date(e.target.value);
                  setEditedCourseData({
                    ...editedCourseData,
                    startDate: e.target.value,
                    endDate: new Date(
                      startDateObj.setDate(
                        startDateObj.getDate() +
                          parseInt(editedCourseData.duration, 10)
                      )
                    )
                      .toISOString()
                      .split("T")[0],
                  });
                }}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label>
              Duration:
              <input
                type="number"
                value={editedCourseData.duration}
                onChange={(e) => {
                  const startDateObj = new Date(editedCourseData.startDate);
                  setEditedCourseData({
                    ...editedCourseData,
                    duration: e.target.value,
                    endDate: new Date(
                      startDateObj.setDate(
                        startDateObj.getDate() + parseInt(e.target.value, 10)
                      )
                    )
                      .toISOString()
                      .split("T")[0],
                  });
                }}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={editedCourseData.endDate}
                readOnly
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <button
              onClick={handleUpdateCourse}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Update Course
            </button>
            <button
              onClick={() => setEditingCourse(null)}
              className="bg-gray-500 text-white p-2 rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCourses;
