import React, { useState } from "react";
import Swal from "sweetalert2";

const CourseForm = ({ tableData, setFormView, name, handleCourseAdded }) => {
  const instructorNames =
    tableData && Array.isArray(tableData)
      ? tableData
          .filter((entry) => entry[4] === "instructor" && entry[1] === 1) // Filter where the 4th value is "instructor"
          .map((entry) => entry[3])
      : [];
  // console.log(tableData);

  // Extract the 3rd value (name)

  //   console.log(instructorNames);

  const [formData, setFormData] = useState({
    courseId: "",
    courseTitle: "",
    description: "",
    instructor: "",
    startDate: "",
    duration: "", // Duration in days
    endDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [id]: value };

      // Automatically calculate end date if startDate and duration are provided
      if (id === "startDate" || id === "duration") {
        const { startDate, duration } = updatedData;

        if (startDate && duration) {
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(
            startDateObj.setDate(
              startDateObj.getDate() + parseInt(duration, 10)
            )
          );
          updatedData.endDate = endDateObj.toISOString().split("T")[0]; // Format to YYYY-MM-DD
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      // Sending POST request using fetch API
      const response = await fetch("http://localhost:5000/api/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is OK
      if (response.ok) {
        setFormView(false);
        Swal.fire({
          title: "Course Creation Complete",
          text: "The Course have been successfully created and Notification sent",
          icon: "success",
        });
        handleCourseAdded();
        // setNa(name);
        // window.location.reload();
      } else {
        alert("Error creating course or sending emails1");
      }
    } catch (error) {
      alert(
        "Some error occured try using different course id or try after some time"
      );
    }

    // Add your submission logic here (e.g., API call)
  };

  return (
    <div className="w-full max-w-2xl flex h-full items-center justify-center p-10 ">
      <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-y-auto">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Create New Course
          </h2>
          <form onSubmit={handleSubmit} className=" space-y-5">
            {/* Course ID */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="courseId"
                className="block text-lg font-medium text-gray-700"
              >
                Course ID
              </label>
              <input
                type="text"
                id="courseId"
                value={formData.courseId}
                onChange={handleChange}
                placeholder="Course ID"
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                required
              />
            </div>
            {/* Course Title */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="courseTitle"
                className="block text-lg font-medium text-gray-700"
              >
                Course Title
              </label>
              <input
                type="text"
                id="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                placeholder="Course Title"
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write here ..."
                rows="3"
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                required
              />
            </div>

            {/* Select Instructor */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="instructor"
                className="block text-lg font-medium text-gray-700"
              >
                Select Instructor
              </label>
              <select
                id="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
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
            </div>

            {/* Start Date */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="startDate"
                className="block text-lg font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                required
              />
            </div>

            {/* Duration */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="duration"
                className="block text-lg font-medium text-gray-700"
              >
                Duration (in days)
              </label>
              <input
                type="number"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter duration in days"
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                required
              />
            </div>

            {/* End Date (Calculated) */}
            <div className="flex flex-row flex-wrap">
              <label
                htmlFor="endDate"
                className="block text-lg font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                readOnly
                className=" block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3 bg-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                type="submit"
                className="text-green-600 flex-row flex items-center border-2 border-green-500 rounded-lg p-2 m-2 hover:text-white hover:bg-green-500 transition-all duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setFormView(false)}
                className="m-2 text-lg text-red-500 border-2 border-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 h-max px-2 py-1 rounded-lg"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
