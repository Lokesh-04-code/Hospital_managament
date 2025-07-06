import React from "react";
import Table from "./table";
import YourAppointments from "./yourappointments";

function ThirdDiv() {
  return (
    <div className="mt-5 bg-gray-100 w-full max-w-5xl mx-auto rounded-xl p-4">
      <YourAppointments />
      <Table />
    </div>
  );
}

export default ThirdDiv;
