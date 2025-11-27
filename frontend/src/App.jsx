import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import ChangePassword from "./pages/ChangePassword";

import Dashboard from "./pages/admin/Dashboard";
import UserList from "./pages/admin/UserList";
import CreateUser from "./pages/admin/CreateUser";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/unauthorized" element={<h2 className="unauthorized">Unauthorized Access</h2>} />
          <Route 
            path="/welcome" 
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route 
            path="/admin/create-user" 
            element={
              <AdminRoute>
                <CreateUser />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}