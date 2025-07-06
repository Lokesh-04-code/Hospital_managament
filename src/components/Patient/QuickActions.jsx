
import { Plus, Calendar } from "lucide-react"; // Assuming you're using Lucide icons

const QuickActions = (props) => {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Quick Actions */}
        <div className="rounded-lg bg-white text-black shadow-xl border-0">
          {/* CardHeader */}
          <div className="flex flex-col space-y-1.5 p-6">
            {/* CardTitle */}
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-800">
              Quick Actions
            </h3>
            {/* CardDescription */}
            <p className="text-sm text-gray-500">
              Manage your healthcare appointments
            </p>
          </div>

          {/* CardContent */}
          <div className="p-6 pt-0">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Book Appointment Button */}
              <button
                onClick={() => props.setShowBooking(true)}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white p-6 h-auto flex items-center space-x-3 rounded-md"
              >
                <Plus className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">Book New Appointment</div>
                  <div className="text-sm opacity-90">
                    Schedule with your preferred doctor
                  </div>
                </div>
              </button>

              {/* View Calendar Button */}
              <button className="p-6 h-auto flex items-center space-x-3 border-2 border-blue-200 hover:bg-blue-50 rounded-md">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-blue-600">
                    View Calendar
                  </div>
                  <div className="text-sm text-gray-600">
                    See all your appointments
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Conditional rendering */}
     
    </div>
  );
};

export default QuickActions;
