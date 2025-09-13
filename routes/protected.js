const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Perlu token untuk mengakses halaman ini",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

router.get("/category", verifyToken, (req, res) => {
  res.json({
    message: "Perlu token untuk mengakses halaman ini",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

router.get("/product", verifyToken, (req, res) => {
  res.json({
    message: "Perlu token untuk mengakses halaman ini",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
