import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  Drawer,
  Table,
  Button,
  Modal,
  TextInput,
  Spinner,
} from "flowbite-react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaHome,
  FaUser,
  FaBars,
  FaPlus,
  FaHeartbeat,
  FaStethoscope,
  FaPen,
  FaUser as FaUserIcon,
  FaSignOutAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookAppointmentModal from "./BookAppointmentModal";
import MLPredictor from "./PredictionTool";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionType, setPredictionType] = useState(null);

  // Function to handle modal for disease prediction
  const handleOpenModal = (type) => {
    setPredictionType(type);
    setIsModalOpen(true);
  };

  // Function to handle modal for appointment bookings
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPredictionType(null);
  };

  // Fetch the usename, id, token stored in localstorage
  const user = useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    []
  );
  const userId = user?.id || null;
  const token = useMemo(() => localStorage.getItem("token"), []);

  // useEffect function for profile updation.
  useEffect(() => {
    if (userId) {
      setEditProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [userId]); // Removed `user` dependency to prevent infinite loops

  // Fetch data function. used for fetching various datas like appointment doctor etc
  const fetchData = async (url, setter, errorMessage) => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorMessage);
      }
      const data = await response.json();
      console.log(data);

      setter(data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  // Fetching appointments, doctors.
  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        await Promise.all([
          fetchData(
            `http://localhost:5000/api/appointments/user/${userId}`,
            (data) => setAppointments(data),
            "Failed to load appointments"
          ),
          fetchData(
            "http://localhost:5000/api/doctors",
            setDoctors,
            "Failed to load doctors"
          ),
        ]);
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Function to update profiile
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProfile),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      localStorage.setItem("user", JSON.stringify(data.user));
      setIsProfileModalOpen(false);
      showSuccessToast("Profile updated successfully!");
    } catch (err) {
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toast settings for error and succsess
  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Handling the tabs in dashboard for mobile first
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  // Function to cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    console.log("Canceling appointment with ID:", appointmentId); // Debugging line

    if (!appointmentId) {
      showErrorToast("Invalid appointment ID.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    setIsCancelling(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel appointment");
      }

      showSuccessToast("Appointment canceled successfully!");

      // Refresh the appointments list
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  // Function to book appointment
  const handleNewAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [
      newAppointment,
      ...prevAppointments,
    ]);
  };

  // Signout function
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Main web layout starts here
  // Loader
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar className="w-64 bg-white shadow-lg h-screen fixed flex-col">
          <Sidebar.Items className="flex flex-col h-full">
            <Sidebar.ItemGroup className="flex-grow">
              {[
                { name: "Home", icon: FaHome, key: "home" },
                {
                  name: "Appointments",
                  icon: FaCalendarAlt,
                  key: "appointments",
                },
                { name: "Doctors", icon: FaUserMd, key: "doctors" },
              ].map(({ name, icon: Icon, key }) => (
                <Sidebar.Item
                  key={key}
                  icon={Icon}
                  active={activeTab === key}
                  className={`transition-colors duration-200 ${
                    activeTab === key
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "hover:bg-primary-light hover:text-primary-dark"
                  }`}
                  onClick={() => handleTabChange(key)}
                >
                  {name}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup className="mt-auto">
              <Sidebar.Item
                icon={FaUser}
                active={activeTab === "profile"}
                className={`transition-colors duration-200 ${
                  activeTab === "profile"
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "hover:bg-primary-light hover:text-primary-dark"
                }`}
                onClick={() => handleTabChange("profile")}
              >
                {user?.name || "User"}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="left"
        className="md:hidden"
      >
        <Drawer.Header title="Menu" className="bg-primary text-white" />
        <Drawer.Items className="bg-white">
          {[
            { name: "Home", icon: FaHome, key: "home" },
            { name: "Appointments", icon: FaCalendarAlt, key: "appointments" },
            { name: "Doctors", icon: FaUserMd, key: "doctors" },
            { name: "Profile", icon: FaUser, key: "profile" },
          ].map(({ name, icon: Icon, key }) => (
            <div
              key={key}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeTab === key
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "hover:bg-primary-light hover:text-primary-dark"
              }`}
              onClick={() => handleTabChange(key)}
            >
              <Icon className="mr-3" />
              <span>{name}</span>
            </div>
          ))}
        </Drawer.Items>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64 py-16">
        {activeTab === "home" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome, {user?.name || "User"}!
            </h2>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Upcoming Appointments
              </h3>
              <Table hoverable className="bg-white">
                <Table.Head>
                  <Table.HeadCell>Doctor</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Time</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {appointments.length > 0 ? (
                    appointments.slice(0, 3).map((appt) => (
                      <Table.Row key={appt._id} className="hover:bg-gray-50">
                        <Table.Cell>
                          {appt.doctorId?.name || "Unknown"}
                        </Table.Cell>
                        <Table.Cell>{appt.appointmentDate}</Table.Cell>
                        <Table.Cell>{appt.appointmentTime}</Table.Cell>
                        <Table.Cell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              appt.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : appt.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appt.status}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell
                        colSpan="4"
                        className="text-center text-gray-500"
                      >
                        No upcoming appointments.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: FaPlus,
                  title: "Book Appointment",
                  desc: "Schedule a consultation with a doctor.",
                  onClick: () => handleTabChange("appointments"),
                },
                {
                  icon: FaHeartbeat,
                  title: "Heart Disease Prediction",
                  desc: "Get a risk assessment for heart disease.",
                  onClick: () => handleOpenModal("heart"),
                },
                {
                  icon: FaStethoscope,
                  title: "Diabetes Prediction",
                  desc: "Assess your risk for diabetes.",
                  onClick: () => handleOpenModal("diabetes"),
                },
              ].map(({ icon: Icon, title, desc, onClick }, index) => (
                <div
                  key={index}
                  onClick={onClick}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition duration-300 hover:border-primary hover:border-2"
                >
                  <Icon className="text-primary text-3xl mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {title}
                  </h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>

            {/* Modal for disease prediction */}
            {isModalOpen && (
              <MLPredictor
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                type={predictionType}
              />
            )}
          </>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Your Appointments
              </h2>
              <Button
                className="bg-primary hover:bg-primary-dark"
                onClick={() => setShowAppointmentModal(true)}
              >
                <FaPlus className="mr-2" /> Book New Appointment
              </Button>
              <BookAppointmentModal
                showModal={showAppointmentModal}
                onClose={() => setShowAppointmentModal(false)}
                onAppointmentBooked={handleNewAppointment}
              />
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Doctor</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {appointments.map((appt) => (
                  <Table.Row key={appt._id} className="hover:bg-gray-50">
                    <Table.Cell className="font-medium text-gray-900">
                      {appt.doctorId?.name || "Unknown"}
                    </Table.Cell>
                    <Table.Cell>{appt.appointmentDate}</Table.Cell>
                    <Table.Cell>{appt.appointmentTime}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="xs"
                          color="light"
                          onClick={() =>
                            toast.info("Reschedule feature coming soon!")
                          }
                        >
                          Reschedule
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleCancelAppointment(appt._id)}
                          disabled={isCancelling}
                        >
                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}

        {activeTab === "doctors" && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Doctors List
            </h2>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Specialty</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y ">
                {doctors.map((doctor) => (
                  <Table.Row key={doctor._id} className="hover:bg-gray-50">
                    <Table.Cell className="font-medium text-gray-900">
                      {doctor.name}
                    </Table.Cell>
                    <Table.Cell>{doctor.specialty}</Table.Cell>

                    <Table.Cell>
                      <Button
                        size="xs"
                        className="bg-primary hover:bg-primary-dark"
                        onClick={() => {
                          setShowAppointmentModal(true);
                          setActiveTab("appointments");
                        }}
                      >
                        Book Appointment
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <FaUserIcon className="text-primary text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-600 mt-2">
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {user?.name || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {user?.email || "Not provided"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {user?.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {new Date(
                      user?.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary-light flex-1"
                disabled={loading}
              >
                <FaPen className="mr-2" /> Edit Profile
              </Button>
              <Button
                color="failure"
                className="flex-1"
                onClick={handleSignOut}
                disabled={loading}
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </Button>
            </div>

            {/* Edit Profile Modal */}
            <Modal
              show={isProfileModalOpen}
              onClose={() => setIsProfileModalOpen(false)}
            >
              <Modal.Header className="border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Edit Profile
                </h3>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <TextInput
                    value={editProfile.name}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, name: e.target.value })
                    }
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <TextInput
                    value={editProfile.email}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, email: e.target.value })
                    }
                    placeholder="Your email"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <TextInput
                    value={editProfile.phone}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                    type="tel"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <Button
                    color="light"
                    onClick={() => setIsProfileModalOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary-dark"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
