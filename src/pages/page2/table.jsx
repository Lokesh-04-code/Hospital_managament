import React from "react";

function Table() {
  return (
    <div className="overflow-x-auto px-4">
      <table className="min-w-full table-auto border border-gray-300 text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Doctor</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Speciality</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Dr. Sarah Johnson</td>
            <td className="border border-gray-300 px-4 py-2">General Practice</td>
            <td className="border border-gray-300 px-4 py-2">2024-07-15</td>
            <td className="border border-gray-300 px-4 py-2">10:00 AM</td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">Confirmed</button>
            </td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Dr. Michael Chen</td>
            <td className="border border-gray-300 px-4 py-2">Cardiology</td>
            <td className="border border-gray-300 px-4 py-2">2024-07-20</td>
            <td className="border border-gray-300 px-4 py-2">02:30 PM</td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-yellow-300 text-black px-2 py-1 rounded text-xs">Pending</button>
            </td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Dr. Emily Rodriguez</td>
            <td className="border border-gray-300 px-4 py-2">Pediatrics</td>
            <td className="border border-gray-300 px-4 py-2">2024-07-25</td>
            <td className="border border-gray-300 px-4 py-2">09:00 AM</td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-gray-200 text-black px-2 py-1 rounded text-xs">Completed</button>
            </td>
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
