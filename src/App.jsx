import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Nav from "./components/Nav";
import HomeLayout from "./components/HomeLayout";
import LogIn from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Patients from "./components/Patients";
import BookAppointment from "./components/BookAppointment";
import AdminDashboard from "./components/AdminDashboard";
import DoctorDashboard from "./components/DoctorDasboard";
import AdminDoctorManagement from "./components/AdminDoctorManagement";
import Register from "./components/Register";

function App() {
  // Retrieve logged-in user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <Router>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard userId={currentUser?.id} />
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
      </Routes>
    </Router>
  );
}

export default App;
