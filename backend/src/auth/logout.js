const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({ message: "Logged out successfully" });
});

module.exports = router;
