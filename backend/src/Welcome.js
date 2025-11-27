const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).json({
    message: `Welcome ${req.user.role === "admin" ? "Admin" : "Student"}, you are logged in!`,
    user: {
      id: req.user.id,
      role: req.user.role
    }
  });
});

module.exports = router;
