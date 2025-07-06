import React from "react";
import { useNavigate } from "react-router-dom";

function TwoButtons() {
  const navigate = useNavigate();

  const Newappointment = (e) => {
    e.preventDefault();
    navigate("/register/newappointment");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <button
          onClick={Newappointment}
          className="w-full lg:w-1/2 h-24 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg sm:text-xl rounded shadow px-4"
        >
          + Book new Appointment Schedule with preferred Doctor
        </button>
        <button
          className="w-full lg:w-1/2 h-24 bg-gray-100 text-lg sm:text-xl rounded shadow px-4"
        >
          View Calendar & see all your appointments
        </button>
      </div>
    </div>
  );
}

export default TwoButtons;
