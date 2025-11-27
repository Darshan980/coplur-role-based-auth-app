const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coplur-role-based-auth-app-4zug.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");
connectDB().then(() => {
  seedAdmin();
});

const User = require("./UserModel");

const register = require("./auth/register");
app.use("/api/auth/register", register);

const signin = require("./auth/signin");
app.use("/api/auth/signin", signin);

const middleware = require("./middleware/auth");
const admin = require("./middleware/admin");

const adminRoutes = require("./admin/adminRoutes");
app.use("/api/admin", middleware, admin, adminRoutes);

const changePassword = require("./auth/changePassword");
app.use("/api/auth/change-password", middleware, changePassword);

const logout = require("./auth/logout");
app.use("/api/auth/logout", middleware, logout);

const welcome = require("./Welcome");
app.use("/api/welcome", middleware, welcome);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});