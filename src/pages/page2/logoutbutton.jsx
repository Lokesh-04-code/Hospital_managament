import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 px-4 py-1 border border-gray-300 rounded-md text-black hover:bg-gray-100 transition text-sm sm:text-base"
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;
