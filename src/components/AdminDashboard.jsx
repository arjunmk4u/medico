import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion"; // For smooth animations

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    totalUsers: 0,
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [doctorsRes, appointmentsRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/api/doctors"),
          fetch("http://localhost:5000/api/appointments"),
          fetch("http://localhost:5000/api/users"),
        ]);

        const doctors = await doctorsRes.json();
        const appointments = await appointmentsRes.json();
        const users = await usersRes.json();

        setStats({
          totalDoctors: doctors.length,
          totalAppointments: appointments.length,
          totalUsers: users.length,
        });

        setAppointments(appointments.slice(0, 5)); // Show latest 5 appointments
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          className="p-6 bg-blue-500 text-white rounded-lg shadow-lg flex items-center gap-4 transform hover:scale-105 transition-all"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaUserMd size={30} />
          <div>
            <h3 className="text-lg font-semibold">Total Doctors</h3>
            <p className="text-xl font-bold">{stats.totalDoctors}</p>
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-green-500 text-white rounded-lg shadow-lg flex items-center gap-4 transform hover:scale-105 transition-all"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCalendarCheck size={30} />
          <div>
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-xl font-bold">{stats.totalAppointments}</p>
          </div>
        </motion.div>

        <motion.div
          className="p-6 bg-purple-500 text-white rounded-lg shadow-lg flex items-center gap-4 transform hover:scale-105 transition-all"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaUsers size={30} />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl font-bold">{stats.totalUsers}</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white shadow-lg rounded-lg mt-8 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Appointments
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Doctor</th>
              <th className="border p-3 text-left">Patient</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="hover:bg-gray-100 transition-all">
                <td className="border p-3">{appt.doctorId.name}</td>
                <td className="border p-3">{appt.patientId.name}</td>
                <td className="border p-3">{appt.appointmentDate}</td>
                <td className="border p-3">{appt.appointmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Management Button */}
      <motion.div className="mt-6 text-center" whileHover={{ scale: 1.1 }}>
        <Link
          to="/admin-management"
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          Manage Doctors
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
