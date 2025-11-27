import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./CreateUser.css";

export default function CreateUser() {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/users", {  
        name,
        email,
        password,
        role,
      });

      alert("User created successfully!");
      navigate("/admin/users");

    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-user-container">
        <h2>Create User</h2>

        <form onSubmit={handleSubmit} className="create-user-form">
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="User Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Create User</button>
        </form>
      </div>
    </>
  );
}