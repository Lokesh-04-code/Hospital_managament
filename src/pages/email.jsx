import React from "react";

function Email({ setEmail }) {
  return (
    <div className="mt-5 px-4">
      <label
        htmlFor="email"
        className="block font-semibold mb-1 text-sm sm:text-base"
      >
        Email:
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default Email;
