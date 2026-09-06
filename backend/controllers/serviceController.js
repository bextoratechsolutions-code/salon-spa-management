const Service = require("../models/Service");

// ===============================
// Create Service
// ===============================
const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      category,
      isActive,
    } = req.body;

    // Required fields
    if (
      !name ||
      price === undefined ||
      !duration ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, price, duration and category are required",
      });
    }

    // Check duplicate service
    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists",
      });
    }

    // Cloudinary image URL
    const imageUrl = req.file ? req.file.path : "";

    console.log("Uploaded file:", req.file);
    console.log("Image URL:", imageUrl);

    // Create service
    const service = await Service.create({
      name,
      description: description || "",
      price,
      duration,
      category,
      isActive:
        isActive === undefined
          ? true
          : isActive === "true" || isActive === true,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Get All Services
// ===============================
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Get Active Services
// ===============================
const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({
      name: 1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get active services error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Get Single Service
// ===============================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Update Service
// ===============================
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const {
      name,
      description,
      price,
      duration,
      category,
      isActive,
    } = req.body;

    // Update text fields
    if (name !== undefined) {
      service.name = name;
    }

    if (description !== undefined) {
      service.description = description;
    }

    if (price !== undefined) {
      service.price = price;
    }

    if (duration !== undefined) {
      service.duration = duration;
    }

    if (category !== undefined) {
      service.category = category;
    }

    if (isActive !== undefined) {
      service.isActive =
        isActive === "true" || isActive === true;
    }

    // ===============================
    // Update Image
    // ===============================
    if (req.file) {
      console.log("New uploaded file:", req.file);
      console.log("New image URL:", req.file.path);

      service.image = req.file.path;
    }

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Delete Service
// ===============================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ===============================
// Export Controllers
// ===============================
module.exports = {
  createService,
  getServices,
  getActiveServices,
  getServiceById,
  updateService,
  deleteService,
};