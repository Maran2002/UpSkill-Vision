import React, { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { TbXboxX } from "react-icons/tb";
import Swal from "sweetalert2";
import CourseForm from "./CourseForm";
const MainDashboard = ({ dashboardData, formView, setFormView }) => {
  const [tableData, setTableData] = useState(dashboardData);

  const filterWhereStatusZero = tableData.filter((item) => item[1] === 0);
  const handleApprove = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:5000/api/approve-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "User Access Approved",
          icon: "success",
        });
        setTableData(data.content);
      } else {
        console.error(`Failed to approve user ${userId}.`);
      }
    } catch (error) {
      console.error(`Error approving user ${userId}:`, error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:5000/api/reject-user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "User Access Rejected",
          icon: "success",
        });
        // console.dir(data.content);
        setTableData(data.content);
      } else {
        console.error(`Failed to reject user ${userId}.`);
      }
    } catch (error) {
      console.error(`Error rejecting user ${userId}:`, error);
    }
  };

  const renderTable = (filteredData) => (
    <div className="overflow-x-auto justify-center">
      <p className="py-5 text-center text-2xl font-semibold">
        Account Activation Requests
      </p>
      <table className="min-w-full border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Email</th>
            <th className="px-4 py-2 border-b border-gray-300">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300">Role</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[0]} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">{item[3]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[0]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[2]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[4]}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <span className="flex flex-row justify-around ">
                  <button type="button" onClick={() => handleApprove(item[0])}>
                    <IoMdCheckmarkCircle className="size-4 text-green-500 hover:scale-150 transition-all" />
                  </button>
                  <button type="button" onClick={() => handleReject(item[0])}>
                    <TbXboxX className="size-4 text-red-500 hover:scale-150 transition-all" />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="w-full justify-center items-center flex flex-col">
      {formView && (
        <div className="absolute w-full top-0 overlay overflow-visible">
          <CourseForm tableData={tableData} setFormView={setFormView} />
        </div>
      )}
      <div>{renderTable(filterWhereStatusZero)}</div>
    </div>
  );
};

export default MainDashboard;
