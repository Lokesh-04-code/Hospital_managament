import React from "react";

function Image() {
  return (
    <div className="flex justify-center my-6">
      <img
        src="profile.jpg"
        alt="profile logo"
        className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
      />
    </div>
  );
}

export default Image;
