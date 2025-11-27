
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

const User = require("./UserModel");

const register = require("./auth/register");
const signin = require("./auth/signin");

const middleware = require("./middleware/auth");
const admin = require("./middleware/admin");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

