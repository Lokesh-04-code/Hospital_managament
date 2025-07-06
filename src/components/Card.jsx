import React from "react";
import {
  Calendar,
  Clock,
  AlarmClock,
  User,
  Stethoscope,
  User2,
  Users,
  IndentIncreaseIcon,
} from "lucide-react"; // import all needed icons

const icons = {
  Calendar: Calendar,
  Clock: Clock,
  AlarmClock: AlarmClock,
  User: User,
  Stethoscope: Stethoscope,
  Users: Users,
  increase: IndentIncreaseIcon,
  // add more as needed
};

const Card = (props) => {
  const IconComponent = icons[props.main] || Calendar; // fallback to Calendar if not found

  return (
    <div className="flex flex-row justify-between items-center p-6 bg-white shadow-xl border-0 rounded-2xl">
      <div className="flex flex-col">
        <div className="text-[15px] text-gray-600 font-bold">
          {props.title || "Today's Appointments"}
        </div>
        <div className={`text-2xl ${props.color} font-bold`}>
          {props.count }
        </div>
      </div>

      <div>
        <IconComponent className={`w-8 h-8 ${props.color} `} />
      </div>
    </div>
  );
};

export default Card;
