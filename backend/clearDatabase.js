require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/UserModel");

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Delete all users
    await User.deleteMany({});
    console.log("✓ All users deleted");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

clearDB();