const mongoose = require("mongoose");

const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Staff = require("../models/Staff");

// ===============================
// Create Appointment
// ===============================

const createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      service,
      staff,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    // ===============================
    // Required Fields
    // ===============================

    if (
      !customerName ||
      !phone ||
      !service ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name, phone, service, date and time are required",
      });
    }

    // ===============================
    // Validate Service ID
    // ===============================

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    // ===============================
    // Check Service Exists & Active
    // ===============================

    const selectedService = await Service.findOne({
      _id: service,
      isActive: true,
    });

    if (!selectedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found or inactive",
      });
    }

    // ===============================
    // Validate Staff
    // ===============================

    if (staff) {
      if (!mongoose.Types.ObjectId.isValid(staff)) {
        return res.status(400).json({
          success: false,
          message: "Invalid staff ID",
        });
      }

      const selectedStaff = await Staff.findOne({
        _id: staff,
        isActive: true,
      });

      if (!selectedStaff) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found or inactive",
        });
      }
    }

    // ===============================
    // Prevent Duplicate Booking
    // Same Date + Same Time
    // ===============================

    const existingAppointment = await Appointment.findOne({
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: {
        $nin: ["Cancelled", "Complete"],
      },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    // ===============================
    // Generate Appointment Number
    // ===============================

    const lastAppointment = await Appointment.findOne({
      appointmentNumber: {
        $exists: true,
        $ne: null,
      },
    })
      .sort({ appointmentNumber: -1 })
      .select("appointmentNumber");

    const appointmentNumber = lastAppointment
      ? lastAppointment.appointmentNumber + 1
      : 1001;

    // ===============================
    // Create Appointment
    // ===============================

    const appointment = await Appointment.create({
      appointmentNumber,
      customerName,
      phone,
      email,
      service,
      staff: staff || null,
      appointmentDate,
      appointmentTime,
      notes,
    });

    // ===============================
    // Populate Appointment
    // ===============================

    const populatedAppointment = await Appointment.findById(
      appointment._id
    )
      .populate("service", "name price duration category")
      .populate("staff", "name role phone specialization");

    // ===============================
    // Success Response
    // ===============================

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// Get All Appointments
// ===============================

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("service", "name price duration category")
      .populate("staff", "name role phone specialization")
      .sort({
        appointmentDate: -1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// Get Single Appointment
// ===============================

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("service", "name price duration category")
      .populate("staff", "name role phone specialization");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Get appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// Update Appointment
// ===============================

const updateAppointment = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      service,
      staff,
      appointmentDate,
      appointmentTime,
      notes,
      status,
    } = req.body;

    // ===============================
    // Validate Service
    // ===============================

    if (service) {
      if (!mongoose.Types.ObjectId.isValid(service)) {
        return res.status(400).json({
          success: false,
          message: "Invalid service ID",
        });
      }

      const selectedService = await Service.findOne({
        _id: service,
        isActive: true,
      });

      if (!selectedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found or inactive",
        });
      }
    }

    // ===============================
    // Validate Staff
    // ===============================

    if (staff) {
      if (!mongoose.Types.ObjectId.isValid(staff)) {
        return res.status(400).json({
          success: false,
          message: "Invalid staff ID",
        });
      }

      const selectedStaff = await Staff.findOne({
        _id: staff,
        isActive: true,
      });

      if (!selectedStaff) {
        return res.status(404).json({
          success: false,
          message: "Staff member not found or inactive",
        });
      }
    }

    // ===============================
    // Prevent Duplicate Booking
    // When Admin Changes Date/Time
    // ===============================

    if (appointmentDate && appointmentTime) {
      const existingAppointment = await Appointment.findOne({
        _id: {
          $ne: req.params.id,
        },
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: {
          $nin: ["Cancelled", "Complete"],
        },
      });

      if (existingAppointment) {
        return res.status(409).json({
          success: false,
          message:
            "This time slot is already booked. Please choose another time.",
        });
      }
    }

    // ===============================
    // Update Appointment
    // ===============================

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        phone,
        email,
        service,
        staff: staff || null,
        appointmentDate,
        appointmentTime,
        notes,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("service", "name price duration category")
      .populate("staff", "name role phone specialization");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Update appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// Delete Appointment
// ===============================

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// Export
// ===============================

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};