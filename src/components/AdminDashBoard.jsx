import React, { useEffect, useState } from "react";
import TotalCards from "./Admin/TotalCards";
import CustomTable from "./CustomTable";
import Header from "./Header";

const AdminDashBoard = () => {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for totals
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [completedTodayCount, setCompletedTodayCount] = useState(0);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [slotDate, setSlotDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
          fetch(
            "https://hospital-backend-lojd.onrender.com/api/appointments/all",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch("https://hospital-backend-lojd.onrender.com/api/doctor/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://hospital-backend-lojd.onrender.com/api/patients/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!appointmentsRes.ok || !doctorsRes.ok || !patientsRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const appointmentsData = await appointmentsRes.json();
        const doctorsData = await doctorsRes.json();
        const patientsData = await patientsRes.json();

        const today = new Date().toISOString().split("T")[0];

        const formattedAppointments = appointmentsData.appointments.map(
          (appt) => {
            const appointmentDateTime = new Date(`${appt.date}T${appt.time}`);
            const now = new Date();
            const status = appointmentDateTime > now ? "Upcoming" : "Completed";

            return {
              id: appt._id,
              time: `${appt.date} ${appt.time}`,
              date: appt.date,
              patient: appt.patient?.username || "Unknown",
              type: appt.type || "General",
              status,
            };
          }
        );

        const todays = formattedAppointments.filter(
          (appt) => appt.date === today
        );

        const completedToday = todays.filter(
          (appt) => appt.status === "Completed"
        ).length;

        const formattedDoctors = doctorsData.map((doc) => ({
          id: doc._id,
          doctor: doc.name,
          specialty: doc.specialty || "General",
          email: doc.email,
          rating: doc.rating || "5.0",
        }));

        // Set state
        setAppointments(formattedAppointments);
        setTodayAppointments(todays);
        setDoctors(formattedDoctors);

        // Set counts
        setDoctorsCount(doctorsData.length);
        setPatientsCount(patientsData.length);
        setAppointmentsCount(formattedAppointments.length);
        setCompletedTodayCount(completedToday);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleGenerateSlots = async () => {
    if (!selectedDoctor || !slotDate) {
      alert("Please select both a doctor and a date.");
      return;
    }

    try {
      const res = await fetch(
        `https://hospital-backend-lojd.onrender.com/api/slots/doctor/${selectedDoctor}/generate-slots`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: slotDate }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Slots generated successfully!");
        setSlotDate("");
        setSelectedDoctor("");
      } else {
        alert(data.message || "Failed to generate slots.");
      }
    } catch (error) {
      console.error("Error generating slots:", error);
      alert("Something went wrong.");
    }
  };

  const columns = [
    { header: "Time", key: "time" },
    { header: "Patient", key: "patient" },
    { header: "Type", key: "type" },
    { header: "Status", key: "status" },
  ];

  const columnsDoctor = [
    { header: "Doctor", key: "doctor" },
    { header: "speciality", key: "specialty" },
    { header: "email", key: "email" },
    { header: "rating", key: "rating" },
  ];

  return (
    <div className="bg-gray-100 pt-[80px] p-[50px]">
      <Header head="Admin" name="lokesh" main="shield" />

      <div className="p-1 flex flex-col gap-[20px]">
        {/* 🧮 Dashboard Cards */}
        <TotalCards
          doctorsCount={doctorsCount}
          patientsCount={patientsCount}
          appointmentsCount={appointmentsCount}
          completedTodayCount={completedTodayCount}
        />

        {/* 📅 Tables */}
        <CustomTable
          title="Today's Appointments"
          subtitle="Your scheduled appointments for today"
          columns={columns}
          data={todayAppointments}
          loading={loading}
        />

        <CustomTable
          title="Doctors Overview"
          subtitle="Manage your health providers"
          columns={columnsDoctor}
          data={doctors}
          loading={loading}
        />

        <CustomTable
          title="Recent Appointments"
          subtitle="Latest appointments"
          columns={columns}
          data={appointments.slice(0, 5)}
          loading={loading}
        />
        {/* 🕓 Slot Generator */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Generate Slots for Doctor
          </h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.doctor}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
            />

            <button
              onClick={handleGenerateSlots}
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Generate Slots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
