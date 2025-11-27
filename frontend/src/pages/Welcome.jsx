import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Welcome.css";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <h2>Welcome {user?.name || user?.email}</h2>
        <p>You are logged in as: <strong>{user?.role}</strong></p>
      </div>
    </>
  );
}