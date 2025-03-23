import { useState, useEffect } from "react";
import { FaUserMd, FaCalendarAlt, FaHome, FaUser } from "react-icons/fa";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    if (!userId) {
      console.error("No userId found. Make sure the user is logged in.");
      return;
    }
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/appointments/user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5 space-y-4 hidden h-screen md:block fixed">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center space-x-2 px-4 py-3 w-full rounded-lg ${
            activeTab === "home" ? "bg-primary text-white" : "text-gray-700"
          }`}
        >
          <FaHome />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`flex items-center space-x-2 px-4 py-3 w-full rounded-lg ${
            activeTab === "appointments"
              ? "bg-primary text-white"
              : "text-gray-700"
          }`}
        >
          <FaCalendarAlt />
          <span>Appointments</span>
        </button>
        <button
          onClick={() => setActiveTab("doctors")}
          className={`flex items-center space-x-2 px-4 py-3 w-full rounded-lg ${
            activeTab === "doctors" ? "bg-primary text-white" : "text-gray-700"
          }`}
        >
          <FaUserMd />
          <span>Doctors</span>
        </button>

        <div className="absolute bottom-10">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-2 px-4 py-3 w-full rounded-lg ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-gray-700"
            }`}
          >
            <FaUser />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "home" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to Your Dashboard
            </h2>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Appointments
              </h3>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <div key={appt._id} className="p-4 border-b last:border-none">
                    <p>
                      <strong>Doctor:</strong> {appt.doctorId.name} (
                      {appt.doctorId.specialty})
                    </p>
                    <p>
                      <strong>Date:</strong> {appt.appointmentDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {appt.appointmentTime}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No upcoming appointments.</p>
              )}
            </div>

            {/* Three Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="/book.png"
                  alt="Book Appointment"
                  className="w-16 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">Book Appointment</h3>
                <p className="text-gray-600">
                  Schedule a visit with your doctor now.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="/heart.png"
                  alt="Heart Prediction"
                  className="w-16 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">
                  Heart Disease Prediction
                </h3>
                <p className="text-gray-600">
                  Check your heart health with AI-powered analysis.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="/diabetes.png"
                  alt="Diabetes Prediction"
                  className="w-16 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">Diabetes Prediction</h3>
                <p className="text-gray-600">
                  Assess your risk for diabetes with smart analysis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              My Appointments
            </h2>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <div key={appt._id} className="bg-white p-4 mb-4 shadow-md">
                  <p>
                    <strong>Doctor:</strong> {appt.doctorId.name} (
                    {appt.doctorId.specialty})
                  </p>
                  <p>
                    <strong>Date:</strong> {appt.appointmentDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt.appointmentTime}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No booked appointments.</p>
            )}
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Available Doctors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
