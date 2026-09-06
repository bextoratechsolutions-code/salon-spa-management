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

// Public
router.get("/", getServices);

router.get("/active", getActiveServices);

router.get("/:id", getServiceById);

// Admin only
router.post("/", protect, upload.single("image"), createService);

router.put("/:id", protect, upload.single("image"), updateService);

router.delete("/:id", protect, deleteService);

module.exports = router;