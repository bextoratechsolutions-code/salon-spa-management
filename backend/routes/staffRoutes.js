const express = require("express");

const {
  createStaff,
  getStaff,
  getActiveStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getStaff);
router.get("/active", getActiveStaff);
router.get("/:id", getStaffById);

// Admin only
router.post("/", protect, createStaff);
router.put("/:id", protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

module.exports = router;