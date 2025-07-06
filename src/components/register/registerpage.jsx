import React from "react";
import Name from "./Name";
import Email from "./email";
import RegisterPassword from "./registerpassword";
import Register from "./register";
import Phone from "./phone";
import RegisterButton from "./registerbutton";

function RegistrationPage() {
  return (
    <div className="bg-[rgba(2,5,100,0.1)] min-h-screen">
      <div className="  bg-gray-100 shadow-md h-120  w-170 rounded-2xl absolute top-50 left-130">
        <Register />
        <Name />
        <Email />
        <RegisterPassword />
        <Phone />
        <RegisterButton />
      </div>
    </div>
  );
}
export default RegistrationPage;
