const Appointment = require("../models/Appointment");

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    // Current date
    const now = new Date();

    // Start of today
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // End of today
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    // Start of current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // End of current year
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // Total appointments
    const totalAppointments = await Appointment.countDocuments();

    // Today's appointments
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
    });

    // Status counts
    const pending = await Appointment.countDocuments({
      status: "Pending",
    });

    const inProgress = await Appointment.countDocuments({
      status: "In Progress",
    });

    const complete = await Appointment.countDocuments({
      status: "Complete",
    });

    const cancelled = await Appointment.countDocuments({
      status: "Cancelled",
    });

    // Monthly statistics
    const monthlyStats = await Appointment.aggregate([
      {
        $match: {
          appointmentDate: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$appointmentDate" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    // Yearly statistics
    const yearlyStats = await Appointment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$appointmentDate" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,

      overview: {
        totalAppointments,
        todayAppointments,
        pending,
        inProgress,
        complete,
        cancelled,
      },

      monthlyStats,

      yearlyStats,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};