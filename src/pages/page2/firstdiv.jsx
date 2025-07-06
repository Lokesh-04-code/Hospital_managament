import React from "react";
import LogoutButton from "./logoutbutton";
import ImageTwo from "./imagetwo";

function FirstDiv() {
  return (
    <div className="w-full bg-red-500 py-4 px-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <ImageTwo />
        <LogoutButton />
      </div>
    </div>
  );
}

export default FirstDiv;
