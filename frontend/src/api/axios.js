import axios from "axios";

const API = axios.create({
  baseURL: window.location.hostname === "localhost" 
    ? "http://localhost:5000/api/auth" 
    : "https://coplur-role-based-auth-app.onrender.com/api/auth",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;