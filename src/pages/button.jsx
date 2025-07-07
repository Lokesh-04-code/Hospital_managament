import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ role, email, password }) {
  const navigate = useNavigate();

  const log = async (e) => {
    e.preventDefault();

    let url = "";

    if (role === "Patient") {
      url = `https://hospital-backend-lojd.onrender.com/api/patients/login`;
    } else if (role === "Doctor") {
      url = `https://hospital-backend-lojd.onrender.com/api/doctor/login`;
    } else if (role === "Admin") {
      url = `https://hospital-backend-lojd.onrender.com/api/admin/login`;
    } else {
      alert("Invalid role");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", role.toLowerCase());
        localStorage.setItem("id", data.id); // optional
        console.log(data.id);
      } else {
        alert("Token not received from server");
        return;
      }

      // 🔁 Navigate to role-based route
      if (role === "Patient") {
        navigate("/patient");
      } else if (role === "Doctor") {
        navigate("/doctor");
      } else if (role === "Admin") {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex justify-center mt-4 px-4">
      <button
        type="button"
        onClick={log}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 px-6 sm:px-8 rounded-lg cursor-pointer text-sm sm:text-base
    transition duration-300 ease-in-out
    active:opacity-70 active:scale-95"
      >
        Login
      </button>
    </div>
  );
}

export default Button;
