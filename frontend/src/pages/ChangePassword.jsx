import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password changed successfully!");
      navigate("/welcome");
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="change-password-container">
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit} className="change-password-form">
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}