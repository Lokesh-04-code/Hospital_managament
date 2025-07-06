import React from "react";
import { useNavigate } from "react-router-dom";
function RegisterButton() {
  // const navigate = useNavigate();
  const signupdone = () => {
    //     navigate("/signupdone")
  };
  return (
    <div>
      <button
        type="button"
        onClick={signupdone}
        className="m-5 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded w-150"
      >
        Register
      </button>
    </div>
  );
}
export default RegisterButton;
