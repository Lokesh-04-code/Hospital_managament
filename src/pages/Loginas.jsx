import React from "react";

function LoginAs({ role, setRole }) {
  return (
    <div className="px-4 mt-4">
      <label htmlFor="login" className="block font-semibold mb-2 text-sm sm:text-base">
        Login As
      </label>
      <select
        id="login"
        name="login"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full max-w-sm border-2 border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
      >
        <option value="">Select role</option>
        <option value="Patient">Patient</option>
        <option value="Doctor">Doctor</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  );
}

export default LoginAs;
