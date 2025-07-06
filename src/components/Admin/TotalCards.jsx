import React from "react";
import Card from "../Card";
const TotalCards = (props) => {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-6">
        <Card
          title="Total Doctor's"
          color="text-blue-600"
          main="Stethoscope"
          count={props.doctorsCount}
        />
        <Card
          title="Total Patient's"
          color="text-green-600"
          main="Users"
          count={props.patientsCount}
        />
        <Card
          title="Total Appointments"
          color="text-violet-600"
          main="Calender"
          count={props.appointmentsCount}
        />
        <Card
          title="Completed"
          color="text-orange-600"
          main="increase"
          count={props.completedTodayCount}
        />
      </div>
    </>
  );
};

export default TotalCards;
