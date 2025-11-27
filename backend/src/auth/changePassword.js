const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../UserModel");

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(201).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
