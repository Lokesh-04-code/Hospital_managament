import React from "react";
import { Stethoscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  AlarmClock,
  User,
  User2,
  Users,
  IndentIncreaseIcon,
  Shield,
} from "lucide-react"; // import all needed icons

const icons = {
  Calendar: Calendar,
  Clock: Clock,
  AlarmClock: AlarmClock,
  User: User,
  Stethoscope: Stethoscope,
  Users: Users,
  increase: IndentIncreaseIcon,
  shield: Shield,

  // add more as needed
};
const Header = (props) => {
  const IconComponent = icons[props.main] || Calendar; // fallback to Calendar if not found
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="mb-[50px] bg-gradient-to-br from-blue-50 via-white to-green-50 ">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {props.head} Portal
              </h1>
              <p className="text-sm text-gray-600">Welcome, {props.name}</p>
              <p className="text-xs text-gray-500">{props.specialty}</p>
            </div>
          </div>

          {/* Right Side - Normal Button */}
          <button
            onClick={logout}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
