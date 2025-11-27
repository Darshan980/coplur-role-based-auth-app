import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin <strong>{user?.name || user?.email}</strong>!</p>

        <div className="dashboard-actions">
          <button 
            onClick={() => navigate("/admin/users")}
            className="btn btn-primary"
          >
            View Users
          </button>
          
          <button 
            onClick={() => navigate("/admin/create-user")}
            className="btn btn-success"
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
}