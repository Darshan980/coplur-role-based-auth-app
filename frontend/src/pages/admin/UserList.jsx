import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error loading users:", err);
        alert(err.response?.data?.message || "Failed to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div className="user-list-container">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="user-list-container">
        <div className="user-list-header">
          <h2>User List</h2>
          <button 
            onClick={() => navigate("/admin/create-user")}
            className="add-user-button"
          >
            + Create User
          </button>
        </div>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => deleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}