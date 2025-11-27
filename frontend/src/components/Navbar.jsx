import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../pages/LogoutButton";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {user.role === "admin" ? (
          <Link to="/admin/dashboard"><strong>Admin Dashboard</strong></Link>
        ) : (
          <Link to="/welcome"><strong>Student Portal</strong></Link>
        )}
      </div>

      <div className="navbar-links">
        {user.role === "admin" && (
          <>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/create-user">Create User</Link>
          </>
        )}
        <button 
          onClick={() => navigate("/change-password")} 
          className="change-password-button"
        >
          Change Password
        </button>
        <LogoutButton />
      </div>
    </nav>
  );
}