import React from "react";

const TodayAppointmenst = ({ appointments }) => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  // Filter only today's appointments
  const todayAppointments = appointments.filter((appt) => appt.date === today);

  // Determine status based on current time
  const getStatus = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();
    return appointmentDateTime < now ? "Completed" : "Upcoming";
  };

  return (
    <div className="bg-white shadow-xl border-0 rounded-lg text-card-foreground">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-800">
          Today's Appointments
        </h3>
        <p className="text-sm text-muted-foreground">
          Your scheduled appointments for today
        </p>
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Time
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Patient
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Type
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((appointment) => {
                const status = getStatus(appointment.date, appointment.time);
                return (
                  <tr
                    key={appointment._id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 font-medium">{appointment.time}</td>
                    <td className="p-4">{appointment.patient.username}</td>
                    <td className="p-4">
                      {appointment.type || "General Checkup"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          status === "Completed"
                            ? "bg-green-600 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {todayAppointments.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No appointments scheduled for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodayAppointmenst;
