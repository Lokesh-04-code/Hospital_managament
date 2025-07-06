import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

const AppointmentBooking = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    insurance: "",
    id: localStorage.getItem("id"),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you stored it after login

        const response = await fetch(
          "https://hospital-backend-lojd.onrender.com/api/doctor/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ attach token here
            },
          }
        );

        const data = await response.json();
        console.log(data);

        console.log("Fetched Doctors:", data);
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const update = (f, v) => setFormData((prev) => ({ ...prev, [f]: v }));

  const getAvailableTimeSlots = () => {
    const selectedDoctor = doctors.find((doc) => doc._id === formData.doctor);
    const dateSlots = selectedDoctor?.dailySlots?.find(
      (slot) => slot.date === formData.date
    );
    return dateSlots?.slots?.filter((s) => !s.isBooked) || [];
  };

  const doSubmit = async () => {
    const { doctor, date, time, firstName, lastName, email, phone, reason } =
      formData;

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    try {
      const res = await fetch(
        "https://hospital-backend-lojd.onrender.com/api/appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctorId: doctor,
            date,
            time,
            patientName: `${firstName} ${lastName}`,
            email,
            phone,
            reason,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to book appointment");
      }

      console.log("Appointment booked:", result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  if (isSubmitted) {
    const doctor = doctors.find((d) => d._id === formData.doctor);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {doctor?.name} is scheduled for{" "}
            {formData.date} at {formData.time}.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-6">
            <p>📧 Email: {formData.email}</p>
            <p>📱 Phone: {formData.phone}</p>
          </div>
          <button
            onClick={onBack}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Book Appointment
          </h1>
          <div className="w-20" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Steps */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          {[1, 2, 3].map((n) => (
            <React.Fragment key={n}>
              {n > 1 && (
                <div
                  className={`w-16 h-1 ${
                    step > n - 1 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= n
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {n}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Select Doctor
            </h2>
            <p className="text-gray-600">Choose your preferred provider</p>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Choose Doctor
              </label>
              <div className="space-y-2 mt-2">
                {doctors.map((d) => (
                  <div
                    key={d._id}
                    onClick={() => update("doctor", d._id)}
                    className={`p-4 border rounded-md cursor-pointer flex justify-between items-center transition ${
                      formData.doctor === d._id
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{d.name}</h3>
                      <p className="text-sm text-gray-600">{d.specialty}</p>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      ID: {d._id.slice(-4)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={!formData.doctor}
              onClick={() => setStep(2)}
              className={`w-full py-3 text-white rounded-md ${
                formData.doctor
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Select Date & Time
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Calendar className="inline w-4 h-4 mr-2" />
                Appointment Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => update("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>

            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {getAvailableTimeSlots().map((slot) => (
                    <button
                      key={slot._id}
                      onClick={() => update("time", slot.time)}
                      className={`p-3 rounded-md border ${
                        formData.time === slot.time
                          ? "bg-blue-500 text-white border-transparent"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                  {getAvailableTimeSlots().length === 0 && (
                    <p className="text-sm text-red-500 col-span-3">
                      No available slots for this date.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 border rounded-md"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.date || !formData.time}
                className={`flex-1 py-2 text-white rounded-md ${
                  formData.date && formData.time
                    ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3 is same — patient info */}
        {/* ... keep your step 3 code here exactly the same as before ... */}
        {step === 3 && (
          <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Patient Information
            </h2>
            <p className="text-gray-600">
              Please provide your details for the appointment
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <User className="inline w-4 h-4 mr-2" /> First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="First name"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Last name"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Mail className="inline w-4 h-4 mr-2" /> Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email address"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <Phone className="inline w-4 h-4 mr-2" /> Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Phone number"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Insurance Provider
              </label>
              <select
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={formData.insurance}
                onChange={(e) => update("insurance", e.target.value)}
              >
                <option value="">Select insurance</option>
                <option value="aetna">Aetna</option>
                <option value="bluecross">Blue Cross Blue Shield</option>
                <option value="cigna">Cigna</option>
                <option value="humana">Humana</option>
                <option value="medicare">Medicare</option>
                <option value="self-pay">Self Pay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reason for Visit
              </label>
              <textarea
                rows="3"
                value={formData.reason}
                onChange={(e) => update("reason", e.target.value)}
                placeholder="Describe your reason"
                className="mt-1 block w-full border rounded-md px-3 py-2"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-2 border rounded-md"
              >
                Back
              </button>
              <button
                onClick={doSubmit}
                className="flex-1 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
