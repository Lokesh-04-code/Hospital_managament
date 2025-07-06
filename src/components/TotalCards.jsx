import React from "react";
import Card from "./Card";
const TotalCards = ({ today, upcoming, patients }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        <Card main="Calender" color={"text-blue-500"} count={today} />
        <Card
          main="Clock"
          title="Upcoming Appointments"
          color={"text-green-600"}
          count={upcoming}
        />
        <Card
          main="User"
          title="total Patients"
          color={"text-violet-500"}
          count={patients}
        />
      </div>
    </>
  );
};

export default TotalCards;
