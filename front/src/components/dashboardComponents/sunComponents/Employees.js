import React from "react";

const Employees = ({ dashboardData }) => {
  const filterWhereStatusNotZero = dashboardData.filter(
    (item) => item[1] !== 0 && item[4] !== "participant"
  );

  const renderTable = (filteredData) => (
    <div className="overflow-x-auto justify-center">
      <p className="py-5 text-center text-2xl font-semibold">Active Account</p>
      <table className="min-w-full border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Email</th>
            <th className="px-4 py-2 border-b border-gray-300">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[0]} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-300">{item[3]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[0]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[2]}</td>
              <td className="px-4 py-2 border-b border-gray-300">{item[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return <div>{renderTable(filterWhereStatusNotZero)}</div>;
};

export default Employees;
