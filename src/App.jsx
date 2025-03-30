import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Nav from "./components/Nav";
import HomeLayout from "./components/HomeLayout";
import LogIn from "./components/Login";
import UserDashboard from "./components/Dashboard"; // Updated import
import ProtectedRoute from "./components/ProtectedRoute";
import Patients from "./components/Patients";
import AdminDashboard from "./components/AdminDashboard";
import AdminDoctorManagement from "./components/AdminDoctorManagement";
import Register from "./components/Register";
import AppointmentsList from "./components/AppointmentsList";
import AppointmentDetail from "./components/AppointmentDetail";
import DoctorDashboard from "./components/DoctorDashboard";
import PredictionTool from "./components/PredictionTool";


function App() {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <Router>
      <Nav />
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
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard /> {/* Updated component name */}
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
        <Route path="/predict" element = {<PredictionTool />} />
      </Routes>
    </Router>
  );
}

export default App;
