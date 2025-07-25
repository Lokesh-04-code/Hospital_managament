import React, { useEffect, useState } from "react";
import TodayAppointmenst from "./TodayAppointmenst";
import TotalCards from "./TotalCards";
import TotalAppointments from "./TotalAppointments";
import Header from "./Header";

const DoctorDashBoard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [doctor, setDoctor] = useState({ name: "", speciality: "" });

  // ✅ Fetch current doctor details from API
  const fetchDoctorInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://hospital-backend-lojd.onrender.com/api/doctor/current",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch doctor info");

      const data = await response.json();
      setDoctor({ name: data.name, speciality: data.speciality });
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      alert("Failed to load doctor information");
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://hospital-backend-lojd.onrender.com/api/appointments/doctor",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data.appointments);

      const today = new Date().toISOString().split("T")[0];
      const filtered = data.appointments.filter((appt) => {
        const apptDate = new Date(appt.date).toISOString().split("T")[0];
        return apptDate === today;
      });

      setTodayAppointments(filtered);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const patientMap = appointments.reduce((acc, appt) => {
    const email = appt.patient?.email;
    if (email) {
      acc[email] = (acc[email] || 0) + 1;
    }
    return acc;
  }, {});

  const patientCount = Object.keys(patientMap).length;

  useEffect(() => {
    fetchDoctorInfo();
    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter((appt) => {
    const appointmentDateTime = new Date(`${appt.date}T${appt.time}:00`);
    return appointmentDateTime > new Date();
  });

  return (
    <div className="bg-gray-100">
      <Header
        name={doctor.name}
        speciality={doctor.speciality}
        head="Doctor"
        main="Stethoscope"
      />
      <div className="p-10 flex flex-col gap-[50px]">
        <TotalCards
          today={todayAppointments.length}
          upcoming={upcomingAppointments.length}
          patients={patientCount}
          loading={loading}
        />
        <TodayAppointmenst appointments={appointments} loading={loading} />
        <TotalAppointments appointments={appointments} loading={loading} />
      </div>
    </div>
  );
};

export default DoctorDashBoard;
