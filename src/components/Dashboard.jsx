import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      navigate("/login"); // Redirect to login if no role found
    }
  }, [role, navigate]);

  return (
    <div>
      {role === "user" && <h1>User Dashboard</h1>}
      {role === "doctor" && <h1>Doctor Dashboard</h1>}
      {role === "admin" && <h1>Admin Dashboard</h1>}
    </div>
  );
};

export default Dashboard;
