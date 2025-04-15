import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiLogOut,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
} from "react-icons/fi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch doctor profile & appointments
        const doctorRes = await axios.get(
          `${API_BASE_URL}/api/appointments/doctor/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );


        const doctorData = doctorRes.data.doctor;
        const allAppointments = doctorRes.data.appointments || [];

        // Filter today's appointments
        const today = new Date().toISOString().split("T")[0];
        const todayAppointments = allAppointments.filter(
          (appt) => appt.appointmentDate.split("T")[0] === today
        );

        // Set state with fetched data for doctor and appointments
        setDoctor(doctorData);
        setAppointments(allAppointments);
        setTodayAppointments(todayAppointments);

        // Calculate statistics
        setStats({
          total: allAppointments.length,
          today: todayAppointments.length,
          pending: allAppointments.filter((a) => a.status === "pending").length,
          confirmed: allAppointments.filter((a) => a.status === "confirmed")
            .length,
          completed: allAppointments.filter((a) => a.status === "completed")
            .length,
          cancelled: allAppointments.filter((a) => a.status === "cancelled")
            .length,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/api/appointments/${appointmentId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setAppointments(
        appointments.map((appt) =>
          appt._id === appointmentId ? res.data : appt
        )
      );
      setTodayAppointments(
        todayAppointments.map((appt) =>
          appt._id === appointmentId ? res.data : appt
        )
      );

      // Update stats
      setStats((prev) => ({
        ...prev,
        [newStatus]: prev[newStatus] + 1,
        [res.data.status]: prev[res.data.status] - 1,
      }));
    } catch (err) {
      console.error("Error updating status:", err.response ? err.response.data : err.message);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_BASE_URL}/api/appointments/${appointmentId}/cancel/doctor`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove from local state
      setAppointments(
        appointments.filter((appt) => appt._id !== appointmentId)
      );
      setTodayAppointments(
        todayAppointments.filter((appt) => appt._id !== appointmentId)
      );

      // Update stats
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        today: activeTab === "today" ? prev.today - 1 : prev.today,
        cancelled: prev.cancelled + 1,
      }));
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  const filteredAppointments = () => {
    const baseAppointments =
      activeTab === "today" ? todayAppointments : appointments;

    if (statusFilter === "all") return baseAppointments;
    return baseAppointments.filter((appt) => appt?.status === statusFilter);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {doctor?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="ml-2 font-medium">{doctor?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FiCalendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Appointments
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.total}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiClock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Today's Appointments
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.today}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FiAlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pending}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Appointments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <FiCheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.completed}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Appointments Management
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="w-full sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex rounded-md shadow-sm w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("today")}
                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-l-md ${
                      activeTab === "today"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-r-md ${
                      activeTab === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="overflow-x-auto">
            {filteredAppointments().length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>

                    
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments().map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600">
                              {appointment.patientId?.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.patientId?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.patientId?.email}
                            </div>
                            {appointment.patientId?.phone && (
                              <div className="text-sm text-gray-500">
                                {appointment.patientId?.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.appointmentTime}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col space-y-2">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              handleStatusChange(
                                appointment._id,
                                e.target.value
                              )
                            }
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <FiXCircle className="mr-1" /> Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-500">No appointments found</div>
                {statusFilter !== "all" && (
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Show all appointments
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
