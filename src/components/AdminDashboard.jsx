import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {
  Card,
  Button,
  Table,
  Spinner,
  Badge,
  Alert,
  Progress,
  Avatar,
  Tooltip,
} from "flowbite-react";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalDoctors: 0,
      totalAppointments: 0,
      activeAppointments: 0,
      completedAppointments: 0,
    },
    recentAppointments: [],
    loading: true,
    error: null,
  });

  // Fetch dashboard data with proper error handling
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch doctors data
        const doctorsRes = await axios.get(`${API_BASE_URL}/api/doctors`);
        const doctorsData = Array.isArray(doctorsRes.data)
          ? doctorsRes.data
          : [];

        // Fetch appointments data - updated to handle populated fields
        const appointmentsRes = await axios.get(
          `${API_BASE_URL}/api/appointments`
        );
        const appointmentsData = Array.isArray(appointmentsRes.data)
          ? appointmentsRes.data.map((appt) => ({
              ...appt,
              doctorName: appt.doctorId?.name || "Unknown Doctor",
              patientName: appt.patientId?.name || "Unknown Patient",
              doctorId: appt.doctorId?._id || appt.doctorId,
              patientId: appt.patientId?._id || appt.patientId,
            }))
          : [];

        // Calculate statistics
        const completedAppointments = appointmentsData.filter(
          (appt) => appt.status === "completed"
        ).length;

        setDashboardData({
          stats: {
            totalDoctors: doctorsData.length,
            totalAppointments: appointmentsData.length,
            activeAppointments: appointmentsData.length - completedAppointments,
            completedAppointments,
          },
          recentAppointments: appointmentsData.slice(0, 5),
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        setDashboardData((prev) => ({
          ...prev,
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard data",
        }));
      }
    };

    fetchDashboardData();
  }, []);

  // Status badge component - SIMPLIFIED VERSION
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: "warning",
      confirmed: "success",
      cancelled: "failure",
      completed: "info",
    };

    return (
      <Badge color={statusColors[status] || "gray"} className="capitalize">
        {status}
      </Badge>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = '/login'
  };

  // Loading state
  if (dashboardData.loading) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (dashboardData.error) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <Alert color="failure" className="max-w-2xl">
          <span className="font-medium">Error!</span> {dashboardData.error}
          <div className="mt-4">
            <Button color="failure" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="pt-10 px-10 sm:px-6 lg:px-28 bg-gray-50 min-h-screen pb-12 ">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 ">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of your healthcare management system
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button.Group>
            <Button color="gray" as={Link} to="/admin-management">
              Manage Doctors
            </Button>
            <Button color="gray" as={Link} to="/appointments">
              View Appointments
            </Button>
            <button
                          onClick={handleLogout}
                          className="flex items-center text-gray-500 hover:text-gray-700"
                        >
                          <FiLogOut className="mr-1" /> Logout
                        </button>
          </Button.Group>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Doctors Card */}
        <StatCard
          title="Total Doctors"
          value={dashboardData.stats.totalDoctors}
          icon={<FaUserMd className="text-2xl" />}
          color="blue"
          link="/admin-management"
        />

        {/* Appointments Card */}
        <StatCard
          title="Total Appointments"
          value={dashboardData.stats.totalAppointments}
          icon={<FaCalendarCheck className="text-2xl" />}
          color="green"
          link="/appointments"
        />

        {/* Active Appointments Card */}
        <StatCard
          title="Active Appointments"
          value={dashboardData.stats.activeAppointments}
          icon={<FaClock className="text-2xl" />}
          color="yellow"
          link="/appointments?status=confirmed"
        />

        {/* Completed Appointments Card */}
        <StatCard
          title="Completed Appointments"
          value={dashboardData.stats.completedAppointments}
          icon={<FaCheckCircle className="text-2xl" />}
          color="purple"
          link="/appointments?status=completed"
        />
      </div>

      {/* Recent Appointments Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Recent Appointments
          </h3>
          <Button as={Link} to="/appointments" color="light" size="xs">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Patient</Table.HeadCell>
              <Table.HeadCell>Doctor</Table.HeadCell>
              <Table.HeadCell>Date & Time</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {dashboardData.recentAppointments.length > 0 ? (
                dashboardData.recentAppointments.map((appt) => (
                  <Table.Row key={appt.id} className="hover:bg-gray-50">
                    <Table.Cell>{appt.patientName || "N/A"}</Table.Cell>
                    <Table.Cell>{appt.doctorName || "N/A"}</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span>
                          {appt.appointmentDate
                            ? format(
                                new Date(appt.appointmentDate),
                                "MMM dd, yyyy"
                              )
                            : "N/A"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {appt.appointmentTime || "N/A"}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <StatusBadge status={appt.status || "pending"} />
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip content="View details">
                        <Button
                          as={Link}
                          to={`/appointments/${appt._id}`}
                          size="xs"
                          color="light"
                        >
                          Details
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="5" className="text-center py-6">
                    <div className="text-gray-500">No appointments found</div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, link }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Link to={link}>
      <Card
        className={`bg-gradient-to-br from-${color}-100 to-${color}-50 border-${color}-200 hover:shadow-md transition-all h-full`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-full bg-${color}-500 text-white`}>
            {icon}
          </div>
        </div>
        <div className="mt-2">
          <Progress
            progress={Math.min(value * 10, 100)}
            color={color}
            size="sm"
          />
        </div>
      </Card>
    </Link>
  </motion.div>
);

export default AdminDashboard;
