const Service = require("../models/Service");

// Create Service
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

    if (!name || price === undefined || !duration || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, duration and category are required",
      });
    }

    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists",
      });
    }

    const service = await Service.create({
      name,
      description,
      price,
      duration,
      category,
      isActive,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Services
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Active Services
const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get active services error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Single Service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Service
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

    if (name !== undefined) service.name = name;
    if (description !== undefined) service.description = description;
    if (price !== undefined) service.price = price;
    if (duration !== undefined) service.duration = duration;
    if (category !== undefined) service.category = category;
    if (isActive !== undefined) service.isActive = isActive;

    // New image uploaded
    if (req.file) {
      service.image = req.file.path;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createService,
  getServices,
  getActiveServices,
  getServiceById,
  updateService,
  deleteService,
};