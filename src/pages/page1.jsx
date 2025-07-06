import React, { useState } from "react";
import Image from "./image";
import Patient from "./patientportal";
import Book from "./book";
import LoginAs from "./Loginas";
import Email from "./email";
import Password from "./password";
import Button from "./button";
import { useNavigate } from "react-router-dom";
function PageOne() {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const goregister = () => {
    navigate("/register");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100 px-4 px-4">
      <div className="bg-white text-black w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
        <Image />
        <Patient />
        <Book />
        <LoginAs role={role} setRole={setRole} />
        <Email setEmail={setEmail} />
        <Password setPassword={setPassword} />
        <Button role={role} password={password} email={email} />
        <center>
          <a
            onClick={goregister}
            className="text-red-400 underline cursor-pointer"
          >
            Register?
          </a>
        </center>
      </div>
    </div>
  );
}

export default PageOne;
