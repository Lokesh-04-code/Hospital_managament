import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import QuickActions from "../../components/Patient/QuickActions";
import CustomTable from "../../components/CustomTable";
import AppointmentBooking from "../../components/AppoinmentBooking";

function PageTwo() {
  const columns = [
    { header: "Date", key: "date" },
    { header: "Time", key: "time" },
    { header: "Patient", key: "patient" },
    { header: "Doctor", key: "doctor" },
    { header: "Type", key: "type" },
    { header: "Status", key: "status" },
  ];

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [patientName, setPatientName] = useState("");

  // ✅ Fetch patient name
  const fetchPatientInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://hospital-backend-lojd.onrender.com/api/patients/current",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch patient info");

      const data = await res.json();
      setPatientName(data.username || "User");
    } catch (err) {
      console.error("Error fetching patient info:", err);
      setPatientName("User");
    }
  };

  // ✅ Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://hospital-backend-lojd.onrender.com/api/appointments/patients",
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

        const formattedData = data.appointments.map((appt) => {
          const appointmentDateTime = new Date(`${appt.date}T${appt.time}:00`);
          const now = new Date();
          const status = appointmentDateTime > now ? "Upcoming" : "Completed";

          return {
            id: appt._id,
            date: appt.date,
            time: appt.time,
            patient: appt.patient?.username || "Unknown",
            doctor: appt.doctor?.name || "Unknown",
            type: appt.type || "General Checkup",
            status,
          };
        });

        setAppointments(formattedData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo(); // 👈 fetch name
    fetchAppointments(); // 👈 fetch appointments
  }, []);

  if (showBooking) {
    return <AppointmentBooking onBack={() => setShowBooking(false)} />;
  }

  return (
    <div className="bg-green-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
        <Header name={patientName} head="Patient" main="User" />
        <QuickActions setShowBooking={setShowBooking} />
        <CustomTable
          title="Your Appointments"
          subtitle="Manage and reschedule your upcoming appointments"
          columns={columns}
          data={appointments}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default PageTwo;
