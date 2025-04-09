import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Nav from "./components/Nav";
import HomeLayout from "./components/HomeLayout";
import LogIn from "./components/Login";
import UserDashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import AdminDoctorManagement from "./components/AdminDoctorManagement";
import Register from "./components/Register";
import AppointmentsList from "./components/AppointmentsList";
import DoctorDashboard from "./components/DoctorDashboard";
import GlobalLoader from "./components/GlobalLoader";

const AppContent = () => {
  const location = useLocation(); 
  const showNavbar = ["/", "/login", "/signup"].includes(location.pathname); // Show Nav on these pages

  return (
    <>
      <GlobalLoader />
      {showNavbar && <Nav />} {/* Show Navbar on Home, Login, and Signup */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDoctorManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AppointmentsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
