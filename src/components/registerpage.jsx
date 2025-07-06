import React, { useState } from "react";

function RegistrationPage() {
  const [registerAs, setRegisterAs] = useState("Patient");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Doctor field
  const [name, setName] = useState("");
  const [specialCode, setSpecialCode] = useState("");

  // Patient field
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    // Frontend validation
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    if (registerAs === "Doctor") {
      if (!name || !specialCode) {
        alert("Name and Special Code are required for Doctor registration.");
        return;
      }
    }

    if (registerAs === "Patient" && !username) {
      alert("Username is required for Patient registration.");
      return;
    }

    // API endpoint
    const url =
      registerAs === "Patient"
        ? "https://hospital-backend-lojd.onrender.com/api/patients/register"
        : "https://hospital-backend-lojd.onrender.com/api/doctor/register";

    // Payload based on role
    const payload =
      registerAs === "Patient"
        ? { username, email, password }
        : { name, email, password, specialCode };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Registered successfully as ${registerAs}`);
        // Clear form (optional)
        setUsername("");
        setName("");
        setEmail("");
        setPassword("");
        setSpecialCode("");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {/* Select Role */}
        <div className="mb-5">
          <label className="block font-semibold text-gray-700 mb-2">
            Register as:
          </label>
          <select
            value={registerAs}
            onChange={(e) => setRegisterAs(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        {/* Doctor: Name */}
        {registerAs === "Doctor" && (
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        )}

        {/* Patient: Username */}
        {registerAs === "Patient" && (
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Username:
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block font-semibold text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block font-semibold text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Special Code (Doctor Only) */}
        {registerAs === "Doctor" && (
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Special Code:
            </label>
            <input
              type="text"
              placeholder="Enter Special Code"
              value={specialCode}
              onChange={(e) => setSpecialCode(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        )}

        {/* Register Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleRegister}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
