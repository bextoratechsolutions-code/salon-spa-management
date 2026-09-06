const express = require("express");

const {
  createService,
  getServices,
  getActiveServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all services
router.get("/", getServices);

// Get only active services
router.get("/active", getActiveServices);

// Get single service
router.get("/:id", getServiceById);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Create service + upload image
router.post(
  "/",
  protect,
  upload.single("image"),
  createService
);

// Update service + upload new image
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateService
);

// Delete service
router.delete(
  "/:id",
  protect,
  deleteService
);

module.exports = router;