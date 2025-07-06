import React from "react";

function ImageTwo() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-2">
      
      <div className="flex items-center space-x-3">
        <img
          src="profile.jpg"
          alt="profile logo"
          className="rounded-full w-12 h-12 object-cover"
        />
        <h1 className="font-bold text-xl sm:text-2xl">Patient Portal</h1>
      </div>

      
      <p className="text-sm sm:text-base text-gray-700 mt-2 sm:mt-0">
        Welcome back,
      </p>
    </div>
  );
}

export default ImageTwo;
