const express = require("express");

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// Customer / Public
// ========================================

// Anyone can create an appointment
router.post("/", createAppointment);

// ========================================
// Admin Protected Routes
// ========================================

// Get all appointments
router.get("/", protect, getAppointments);

// Get single appointment
router.get("/:id", protect, getAppointmentById);

// Update appointment
router.put("/:id", protect, updateAppointment);

// Delete appointment
router.delete("/:id", protect, deleteAppointment);

module.exports = router;