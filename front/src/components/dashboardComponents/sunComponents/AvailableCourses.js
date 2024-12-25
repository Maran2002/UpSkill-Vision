import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AvailableCourses = ({ updateTrigger }) => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourseData, setEditedCourseData] = useState({
    name: "",
    instructor: "",
    description: "",
    startDate: "",
    endDate: "",
  });
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
    });
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/update-course/${editingCourse[0]}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(editedCourseData),
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
              <button
                onClick={() => handleEditCourse(course)}
                className="mt-2 bg-blue-500 text-white p-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course[0])}
                className="mt-2 bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses available at the moment.</p>
        )}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
              <input
                type="text"
                value={editedCourseData.instructor}
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    instructor: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
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
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    startDate: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={editedCourseData.endDate}
                onChange={(e) =>
                  setEditedCourseData({
                    ...editedCourseData,
                    endDate: e.target.value,
                  })
                }
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
