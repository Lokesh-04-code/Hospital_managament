import React from "react";

const TotalAppointments = ({ appointments }) => {
  const getStatus = (appointment) => {
    const { date, time } = appointment;

    // Combine date and time into one datetime string: "2025-07-07T09:00:00"
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    return appointmentDateTime < now ? "Completed" : "Upcoming";
  };

  return (
    <div className="bg-white shadow-xl border-0 rounded-lg text-card-foreground mt-[20px]">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-800">
          Total Appointments
        </h3>
        <p className="text-sm text-muted-foreground">
          Your scheduled appointments
        </p>
      </div>

      {/* Table */}
      <div className="p-6 pt-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Date
                </th>
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
              {appointments.map((appointment) => {
                const status = getStatus(appointment);
                return (
                  <tr
                    key={appointment._id}
                    className="border-b transition-colors hover:bg-gray-50"
                  >
                    <td className="p-4">{appointment.date}</td>
                    <td className="p-4 font-medium">{appointment.time}</td>
                    <td className="p-4">
                      {appointment.patient?.username || "Unknown"}
                    </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TotalAppointments;
