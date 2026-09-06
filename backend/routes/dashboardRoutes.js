const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.get("/stats", protect, getDashboardStats);

module.exports = router;