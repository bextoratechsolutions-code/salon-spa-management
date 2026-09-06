const Staff = require("../models/Staff");

// Create Staff
const createStaff = async (req, res) => {
  try {
    const {
      name,
      role,
      phone,
      email,
      specialization,
      isActive,
    } = req.body;

    if (!name || !role || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, role and phone are required",
      });
    }

    const existingStaff = await Staff.findOne({ phone });

    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "Staff member with this phone already exists",
      });
    }

    const staff = await Staff.create({
      name,
      role,
      phone,
      email,
      specialization,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Staff member created successfully",
      staff,
    });
  } catch (error) {
    console.error("Create staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Staff
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Active Staff
const getActiveStaff = async (req, res) => {
  try {
    const staff = await Staff.find({
      isActive: true,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    console.error("Get active staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get Single Staff
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    console.error("Get staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Staff
const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff member updated successfully",
      staff,
    });
  } catch (error) {
    console.error("Update staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error("Delete staff error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createStaff,
  getStaff,
  getActiveStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};