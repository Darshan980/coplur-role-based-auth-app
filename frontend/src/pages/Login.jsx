import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("student"); 

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signin", {
        email,
        password
      });

      if (res.data.user.role !== loginAs) {
        alert(`This account is registered as ${res.data.user.role}, not ${loginAs}`);
        return;
      }

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/welcome");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} className="login-form">
        
        <select
          value={loginAs}
          onChange={(e) => setLoginAs(e.target.value)}
          className="role-select"
        >
          <option value="student">Login as Student</option>
          <option value="admin">Login as Admin</option>
        </select>

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Sign In
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}