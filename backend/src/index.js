
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});


const connectDB = require("./config/db");
connectDB();
const seedAdmin = require("./utils/seedAdmin");
connectDB().then(() => {
  seedAdmin();
});

const User = require("./UserModel");

const register = require("./auth/register");
app.use("/auth/register", register);

const signin = require("./auth/signin");
app.use("/auth/signin", signin);

const middleware = require("./middleware/auth");
const admin = require("./middleware/admin");

const adminRoutes = require("./admin/adminRoutes");
app.use("/admin", middleware, admin, adminRoutes);

const changePassword = require("./auth/changePassword");
app.use("/auth/change-password", middleware, changePassword);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

