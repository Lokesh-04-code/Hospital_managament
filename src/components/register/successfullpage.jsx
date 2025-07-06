import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessfullPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Registration Successful!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Thank you for registering. You can now log in to your account.
        </p>
        <button
          onClick={handleContinue}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

// Exporting with the name RegistrationPageTwo as requested
export default SuccessfullPage;
