import React from "react";

function RegisterPassword() {
  return (
    <div className="mt-5 px-4">
      <label className="block font-semibold mb-2 text-sm sm:text-base">
        Password:
      </label>
      <input
        type="password"
        id="password"
        placeholder="Enter your Password"
        className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
      />
    </div>
  );
}

export default RegisterPassword;
