import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getDashboardStats,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getServices,
  createService,
  updateService,
  deleteService,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../../services/api";

const BrandLogo = () => {
  return (
    <a
      href="/"
      className="flex min-w-0 items-center gap-3 cursor-pointer"
      aria-label="Go to Home"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />

        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/25">
          <svg
            viewBox="0 0 48 48"
            className="h-8 w-8 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.8 12.2C29.8 10.7 27.2 10 24.4 10
              C18.5 10 14.5 13.1 14.5 17.4
              C14.5 21.2 17.3 23.1 23.2 24.5
              C29.2 25.9 32.5 27.7 32.5 31.9
              C32.5 36.4 28.3 39 22.8 39
              C19.2 39 15.9 37.8 13.5 35.6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M30.7 15.1C34.2 13.7 37.1 11.2 38.7 8
              C34.2 8.3 30.5 10.1 27.7 13.2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M17.2 32.9C14.1 34.1 11.3 36.4 9.6 39.4
              C13.8 39.2 17.3 37.6 20 34.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      <div className="min-w-0">
        <p className="truncate font-serif text-xl font-bold tracking-tight text-gray-950">
          Salon<span className="text-violet-600">&</span>Spa
        </p>

        <p className="-mt-1 truncate text-[9px] font-semibold uppercase tracking-[0.28em] text-purple-600">
          MANAGEMENT
        </p>
      </div>
    </a>
  );
};

// ========================================
// ICONS
// ========================================

const DashboardIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="m12 3 1.4 5.1L18 10l-4.6 1.9L12 17l-1.4-5.1L6 10l4.6-1.9L12 3Z" />
    <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

// ========================================
// DASHBOARD
// ========================================

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Spa & Salon Management System";
  }, []);

  const { user, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] =
    useState(false);
  const [servicesLoading, setServicesLoading] =
    useState(false);
  const [staffLoading, setStaffLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // SERVICE FORM
  // ========================================

  const [showServiceForm, setShowServiceForm] =
    useState(false);

  const [editingService, setEditingService] =
    useState(null);

  const [serviceSaving, setServiceSaving] =
    useState(false);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    image: null,
  });

  // ========================================
  // STAFF FORM
  // ========================================

  const [showStaffForm, setShowStaffForm] =
    useState(false);

  const [editingStaff, setEditingStaff] =
    useState(null);

  const [staffSaving, setStaffSaving] =
    useState(false);

  const [staffForm, setStaffForm] = useState({
    name: "",
    phone: "",
    role: "",
    experience: "",
  });

  // ========================================
  // MOBILE SIDEBAR
  // ========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    logout();
  };

  // ========================================
  // LOAD DASHBOARD
  // ========================================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        loadStats(),
        loadAppointments(),
        loadServices(),
        loadStaff(),
      ]);
    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD STATS
  // ========================================

  const loadStats = async () => {
    try {
      const response =
        await getDashboardStats();

      setStats(response);
    } catch (err) {
      console.error("Stats error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard statistics"
      );
    }
  };

  // ========================================
  // LOAD APPOINTMENTS
  // ========================================

  const loadAppointments = async () => {
    try {
      setAppointmentsLoading(true);

      const response =
        await getAppointments();

      const data =
        response?.appointments ||
        response?.data ||
        response ||
        [];

      setAppointments(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Appointments error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load appointments"
      );
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // ========================================
  // LOAD SERVICES
  // ========================================

  const loadServices = async () => {
    try {
      setServicesLoading(true);

      const response =
        await getServices();

      const data =
        response?.services ||
        response?.data ||
        response ||
        [];

      setServices(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Services error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load services"
      );
    } finally {
      setServicesLoading(false);
    }
  };

  // ========================================
  // LOAD STAFF
  // ========================================

  const loadStaff = async () => {
    try {
      setStaffLoading(true);

      const response =
        await getStaff();

      const data =
        response?.staff ||
        response?.data ||
        response ||
        [];

      setStaff(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Staff error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load staff"
      );
    } finally {
      setStaffLoading(false);
    }
  };

  // ========================================
  // SUCCESS MESSAGE
  // ========================================

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  // ========================================
  // APPOINTMENT STATUS
  // ========================================

  const handleStatusChange = async (
    appointmentId,
    status
  ) => {
    try {
      setError("");
      setSuccess("");

      await updateAppointment(
        appointmentId,
        {
          status,
        }
      );

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id ===
          appointmentId
            ? {
                ...appointment,
                status,
              }
            : appointment
        )
      );

      await loadStats();

      showSuccess(
        "Appointment status updated successfully."
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update appointment status."
      );
    }
  };

  // ========================================
  // DELETE APPOINTMENT
  // ========================================

  const handleDeleteAppointment = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this appointment?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteAppointment(id);

      setAppointments((prev) =>
        prev.filter(
          (appointment) =>
            appointment._id !== id
        )
      );

      await loadStats();

      showSuccess(
        "Appointment deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete appointment error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete appointment."
      );
    }
  };

  // ========================================
  // SERVICE FORM
  // ========================================

  const handleServiceChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    setServiceForm((prev) => ({
      ...prev,
      [name]:
        name === "image"
          ? files?.[0] || null
          : value,
    }));
  };

  const resetServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      image: null,
    });

    setEditingService(null);
  };

  const openAddService = () => {
    resetServiceForm();
    setShowServiceForm(true);
  };

  const openEditService = (service) => {
    setEditingService(service);

    setServiceForm({
      name: service.name || "",
      description:
        service.description || "",
      price: service.price ?? "",
      duration:
        service.duration ?? "",
      category:
        service.category || "",
      image:
        service.image || "",
    });

    setShowServiceForm(true);
  };

  const closeServiceForm = () => {
    setShowServiceForm(false);
    resetServiceForm();
  };

  // ========================================
  // ADD / UPDATE SERVICE
  // ========================================

  const handleServiceSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!serviceForm.name.trim()) {
      setError(
        "Service name is required."
      );
      return;
    }

    if (!serviceForm.category.trim()) {
      setError(
        "Service category is required."
      );
      return;
    }

    if (
      serviceForm.price === "" ||
      Number(serviceForm.price) < 0
    ) {
      setError(
        "Please enter a valid service price."
      );
      return;
    }

    if (
      serviceForm.duration === "" ||
      Number(serviceForm.duration) < 1
    ) {
      setError(
        "Please enter a valid duration."
      );
      return;
    }

    // New file selected
    if (
      serviceForm.image instanceof File &&
      serviceForm.image.size >
        5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5MB."
      );
      return;
    }

    try {
      setServiceSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append(
        "name",
        serviceForm.name.trim()
      );

      formData.append(
        "description",
        serviceForm.description.trim()
      );

      formData.append(
        "price",
        String(Number(serviceForm.price))
      );

      formData.append(
        "duration",
        String(Number(serviceForm.duration))
      );

      formData.append(
        "category",
        serviceForm.category.trim()
      );

      // Only send image when a NEW file is selected.
      // During edit, if no new file is selected,
      // backend keeps the old Cloudinary image.
      if (
        serviceForm.image instanceof File
      ) {
        formData.append(
          "image",
          serviceForm.image
        );
      }

      if (editingService) {
        await updateService(
          editingService._id,
          formData
        );

        showSuccess(
          "Service updated successfully."
        );
      } else {
        await createService(
          formData
        );

        showSuccess(
          "Service added successfully."
        );
      }

      await loadServices();

      closeServiceForm();
    } catch (err) {
      console.error(
        "Service save error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save service."
      );
    } finally {
      setServiceSaving(false);
    }
  };

  // ========================================
  // DELETE SERVICE
  // ========================================

  const handleDeleteService = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this service?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteService(id);

      setServices((prev) =>
        prev.filter(
          (service) =>
            service._id !== id
        )
      );

      showSuccess(
        "Service deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete service error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete service."
      );
    }
  };

  // ========================================
  // STAFF FORM
  // ========================================

  const handleStaffChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setStaffForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetStaffForm = () => {
    setStaffForm({
      name: "",
      phone: "",
      role: "",
      experience: "",
    });

    setEditingStaff(null);
  };

  const openAddStaff = () => {
    resetStaffForm();
    setShowStaffForm(true);
  };

  const openEditStaff = (member) => {
    setEditingStaff(member);

    setStaffForm({
      name: member.name || "",
      phone: member.phone || "",
      role: member.role || "",
      experience:
        member.experience || "",
    });

    setShowStaffForm(true);
  };

  const closeStaffForm = () => {
    setShowStaffForm(false);
    resetStaffForm();
  };

  // ========================================
  // ADD / UPDATE STAFF
  // ========================================

  const handleStaffSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!staffForm.name.trim()) {
      setError(
        "Staff name is required."
      );
      return;
    }

    if (!staffForm.role.trim()) {
      setError(
        "Staff role is required."
      );
      return;
    }

    try {
      setStaffSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: staffForm.name.trim(),
        phone: staffForm.phone.trim(),
        role: staffForm.role.trim(),
        experience:
          staffForm.experience.trim(),
      };

      if (editingStaff) {
        await updateStaff(
          editingStaff._id,
          payload
        );

        showSuccess(
          "Staff member updated successfully."
        );
      } else {
        await createStaff(payload);

        showSuccess(
          "Staff member added successfully."
        );
      }

      await loadStaff();

      closeStaffForm();
    } catch (err) {
      console.error(
        "Staff save error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save staff member."
      );
    } finally {
      setStaffSaving(false);
    }
  };

  // ========================================
  // DELETE STAFF
  // ========================================

  const handleDeleteStaff = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this staff member?"
      );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteStaff(id);

      setStaff((prev) =>
        prev.filter(
          (member) =>
            member._id !== id
        )
      );

      showSuccess(
        "Staff member deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete staff error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete staff member."
      );
    }
  };

  // ========================================
  // HELPERS
  // ========================================

  const getServiceName = (
    appointment
  ) => {
    if (!appointment?.service) {
      return "Unknown Service";
    }

    if (
      typeof appointment.service ===
      "object"
    ) {
      return (
        appointment.service.name ||
        "Unknown Service"
      );
    }

    const found = services.find(
      (service) =>
        service._id ===
        appointment.service
    );

    return (
      found?.name ||
      "Unknown Service"
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(
      date
    ).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (
    status
  ) => {
    switch (status) {
      case "Pending":
        return "border-amber-200 bg-amber-50 text-amber-700";

      case "In Progress":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "Complete":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "Cancelled":
        return "border-red-200 bg-red-50 text-red-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  const getStaffInitials = (
    name
  ) => {
    if (!name) return "ST";

    return name
      .split(" ")
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const overview =
    stats?.overview || {};

  const statCards = [
    {
      title: "Total Appointments",
      value:
        overview.totalAppointments ??
        appointments.length,
      icon: <CalendarIcon />,
      description:
        "All reservations",
    },
    {
      title: "Today",
      value:
        overview.todayAppointments ??
        0,
      icon: <DashboardIcon />,
      description:
        "Today's bookings",
    },
    {
      title: "Pending",
      value:
        overview.pending ?? 0,
      icon: <SparklesIcon />,
      description:
        "Awaiting action",
    },
    {
      title: "In Progress",
      value:
        overview.inProgress ?? 0,
      icon: <ArrowIcon />,
      description:
        "Currently active",
    },
    {
      title: "Complete",
      value:
        overview.complete ?? 0,
      icon: (
        <span className="text-lg">
          ✓
        </span>
      ),
      description:
        "Completed visits",
    },
    {
      title: "Cancelled",
      value:
        overview.cancelled ?? 0,
      icon: (
        <span className="text-lg">
          ×
        </span>
      ),
      description:
        "Cancelled visits",
    },
  ];

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-[#faf9ff] text-gray-900">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-gray-950/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[270px] flex-col border-r border-purple-100 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO HEADER */}

        <div className="flex h-[88px] shrink-0 items-center border-b border-purple-100 px-6">
          <BrandLogo />

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-purple-50 hover:text-purple-700 lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* SCROLLABLE MENU */}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
            Workspace
          </p>

          <nav className="mt-4 space-y-2">

            <a
              href="#overview"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="flex items-center gap-3 rounded-xl bg-purple-50 px-4 py-3.5 text-sm font-semibold text-purple-700 transition"
            >
              <DashboardIcon />
              <span>Overview</span>
            </a>

            <a
              href="#appointments"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <CalendarIcon />
              <span>Appointments</span>
            </a>

            <a
              href="#services"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <SparklesIcon />
              <span>Services</span>
            </a>

            <a
              href="#staff"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <UsersIcon />
              <span>Staff</span>
            </a>

          </nav>

          {/* QUICK ACTIONS */}

          <p className="mt-9 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
            Quick Actions
          </p>

          <div className="mt-4 space-y-2">

            <button
              type="button"
              onClick={openAddService}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <PlusIcon />
              <span>Add Service</span>
            </button>

            <button
              type="button"
              onClick={openAddStaff}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <UsersIcon />
              <span>Add Staff</span>
            </button>

            <a
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <ArrowIcon />
              <span>View Website</span>
            </a>

          </div>
        </div>

        {/* ADMIN ACCOUNT */}

        <div className="shrink-0 border-t border-purple-100 bg-white p-4">

          <div className="mb-3 rounded-2xl bg-purple-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-700 text-sm font-bold text-white">
                {(user?.name || "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-gray-900">
                  {user?.name ||
                    "Administrator"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  Administrator
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN AREA */}

      <div className="lg:pl-[270px]">

        {/* TOP BAR */}

        <header className="sticky top-0 z-30 border-b border-purple-100 bg-white/90 backdrop-blur-xl">

          <div className="flex min-h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 lg:hidden"
              >
                ☰
              </button>

              <div className="lg:hidden">

                <p className="font-serif text-lg font-bold">
                  Lumière
                </p>

              </div>

              <div className="hidden lg:block">

                <p className="text-xs font-medium text-gray-400">
                  Beauty Studio
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden text-right sm:block">

                <p className="text-sm font-semibold text-gray-800">
                  {user?.name ||
                    "Administrator"}
                </p>

                <p className="text-xs text-gray-400">
                  {user?.email || ""}
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-700 text-sm font-bold text-white">
                {(user?.name ||
                  "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

          {/* PAGE HEADER */}

          <section
            id="overview"
            className="mb-8"
          >

            <div className="rounded-[28px] bg-gradient-to-br from-purple-700 via-violet-700 to-purple-900 p-7 text-white shadow-xl shadow-purple-100 sm:p-9 lg:p-10">

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                <div>

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100">

                    <span className="h-1.5 w-1.5 rounded-full bg-green-300" />

                    Studio Dashboard

                  </div>

                  <h1 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">

                    Good to see you,{" "}

                    {user?.name?.split(
                      " "
                    )[0] ||
                      "Admin"}
                    .

                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-purple-100 sm:text-base">
                    Manage your appointments,
                    services, staff and salon
                    operations from one
                    beautiful workspace.
                  </p>

                </div>

                <div className="flex shrink-0 flex-wrap gap-3">

                  <button
                    type="button"
                    onClick={
                      loadDashboard
                    }
                    className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    ↻ Refresh
                  </button>

                  <button
                    type="button"
                    onClick={
                      openAddService
                    }
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-lg transition hover:bg-purple-50"
                  >
                    <PlusIcon />
                    Add Service
                  </button>

                  <button
                    type="button"
                    onClick={
                      openAddStaff
                    }
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <UsersIcon />
                    Add Staff
                  </button>

                </div>

              </div>

            </div>

          </section>

          {/* ALERTS */}

          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={() =>
                  setError("")
                }
                className="ml-4 font-bold"
              >
                ×
              </button>

            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
              ✓ {success}
            </div>
          )}

          {/* STATS */}

          {loading ? (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[145px] animate-pulse rounded-2xl border border-purple-100 bg-white"
                  />
                )
              )}

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

              {statCards.map(
                (card) => (

                  <div
                    key={card.title}
                    className="group rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                        {card.icon}
                      </div>

                    </div>

                    <p className="mt-5 text-2xl font-bold text-gray-950">
                      {card.value}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-700">
                      {card.title}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {card.description}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

          {/* APPOINTMENTS */}

          <section
            id="appointments"
            className="mt-10"
          >

            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                  Reservations
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950 sm:text-3xl">
                  Appointments
                </h2>

              </div>

              <div className="rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                {appointments.length} total
              </div>

            </div>

            <div className="overflow-hidden rounded-[24px] border border-purple-100 bg-white shadow-sm">

              {appointmentsLoading ? (

                <div className="flex min-h-[300px] items-center justify-center">

                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-purple-100 border-t-purple-700" />

                </div>

              ) : appointments.length === 0 ? (

                <div className="px-6 py-20 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                    <CalendarIcon />
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-bold">
                    No appointments yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Customer bookings will
                    automatically appear
                    here when someone
                    requests an appointment
                    from the website.
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[1000px]">

                    <thead>

                      <tr className="border-b border-purple-100 bg-purple-50/50 text-left">

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Service
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Date
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Time
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {appointments.map(
                        (
                          appointment
                        ) => (

                          <tr
                            key={
                              appointment._id
                            }
                            className="border-b border-gray-100 last:border-0 hover:bg-purple-50/30"
                          >

                            <td className="px-6 py-5">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-700">

                                  {(
                                    appointment.customerName ||
                                    "U"
                                  )
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div>

                                  <p className="font-semibold text-gray-900">
                                    {appointment.customerName ||
                                      "Unknown"}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    {appointment.phone ||
                                      "No phone"}
                                  </p>

                                </div>

                              </div>

                            </td>

                            <td className="px-6 py-5">

                              <p className="text-sm font-semibold text-gray-700">
                                {getServiceName(
                                  appointment
                                )}
                              </p>

                              {appointment.email && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {appointment.email}
                                </p>
                              )}

                            </td>

                            <td className="px-6 py-5">

                              <p className="text-sm font-medium text-gray-700">
                                {formatDate(
                                  appointment.appointmentDate
                                )}
                              </p>

                            </td>

                            <td className="px-6 py-5">

                              <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
                                {appointment.appointmentTime ||
                                  "—"}
                              </span>

                            </td>

                            <td className="px-6 py-5">

                              <select
                                value={
                                  appointment.status ||
                                  "Pending"
                                }
                                onChange={(
                                  e
                                ) =>
                                  handleStatusChange(
                                    appointment._id,
                                    e.target.value
                                  )
                                }
                                className={`rounded-xl border px-3 py-2 text-xs font-bold outline-none transition ${getStatusClass(
                                  appointment.status
                                )}`}
                              >

                                <option value="Pending">
                                  Pending
                                </option>

                                <option value="In Progress">
                                  In Progress
                                </option>

                                <option value="Complete">
                                  Complete
                                </option>

                                <option value="Cancelled">
                                  Cancelled
                                </option>

                              </select>

                            </td>

                            <td className="px-6 py-5 text-right">

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteAppointment(
                                    appointment._id
                                  )
                                }
                                className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-100"
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>

          {/* SERVICES */}

          <section
            id="services"
            className="mt-12"
          >

            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                  Studio Management
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950 sm:text-3xl">
                  Services
                </h2>

              </div>

              <button
                type="button"
                onClick={
                  openAddService
                }
                className="flex w-fit items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800"
              >
                <PlusIcon />
                Add Service
              </button>

            </div>

            {/* SERVICE FORM */}

            {showServiceForm && (

              <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-sm">

                <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-purple-100 bg-white shadow-2xl">

                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-purple-100 bg-white px-6 py-5 sm:px-8">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                        {editingService
                          ? "Edit Service"
                          : "New Service"}
                      </p>

                      <h3 className="mt-1 font-serif text-2xl font-bold text-gray-950">
                        {editingService
                          ? "Update service"
                          : "Create a service"}
                      </h3>

                    </div>

                    <button
                      type="button"
                      onClick={
                        closeServiceForm
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition hover:bg-purple-50 hover:text-purple-700"
                    >
                      <CloseIcon />
                    </button>

                  </div>

                  <form
                    onSubmit={
                      handleServiceSubmit
                    }
                    className="p-6 sm:p-8"
                  >

                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* NAME */}

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Service Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={
                            serviceForm.name
                          }
                          onChange={
                            handleServiceChange
                          }
                          required
                          placeholder="Haircut"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                        />

                      </div>

                      {/* CATEGORY */}

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Category *
                        </label>

                        <input
                          type="text"
                          name="category"
                          value={
                            serviceForm.category
                          }
                          onChange={
                            handleServiceChange
                          }
                          required
                          placeholder="Hair Services"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                        />

                      </div>

                      {/* PRICE */}

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Price *
                        </label>

                        <div className="relative">

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                            PKR
                          </span>

                          <input
                            type="number"
                            name="price"
                            value={
                              serviceForm.price
                            }
                            onChange={
                              handleServiceChange
                            }
                            min="0"
                            required
                            placeholder="2500"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-14 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                          />

                        </div>

                      </div>

                      {/* DURATION */}

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Duration (minutes) *
                        </label>

                        <input
                          type="number"
                          name="duration"
                          value={
                            serviceForm.duration
                          }
                          onChange={
                            handleServiceChange
                          }
                          min="1"
                          required
                          placeholder="45"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                        />

                        <p className="mt-1.5 text-xs text-gray-400">
                          Enter duration as a number, e.g. 45
                        </p>

                      </div>

                      {/* IMAGE UPLOAD */}

                      <div className="sm:col-span-2">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Service Image
                        </label>

                        <input
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={
                            handleServiceChange
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-700 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-purple-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-200 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                        />

                        <p className="mt-2 text-xs text-gray-400">
                          JPG, PNG or WEBP • Maximum 5MB
                        </p>

                        {/* NEW IMAGE PREVIEW */}

                        {serviceForm.image instanceof File && (
                          <div className="mt-4">

                            <p className="mb-2 text-xs font-semibold text-gray-500">
                              New Image Preview
                            </p>

                            <img
                              src={URL.createObjectURL(
                                serviceForm.image
                              )}
                              alt="New service preview"
                              className="h-36 w-36 rounded-2xl border border-purple-100 object-cover shadow-sm"
                            />

                          </div>
                        )}

                        {/* CURRENT IMAGE */}

                        {editingService &&
                          typeof serviceForm.image ===
                            "string" &&
                          serviceForm.image && (
                            <div className="mt-4">

                              <p className="mb-2 text-xs font-semibold text-gray-500">
                                Current Image
                              </p>

                              <img
                                src={
                                  serviceForm.image
                                }
                                alt={
                                  editingService.name
                                }
                                className="h-36 w-36 rounded-2xl border border-purple-100 object-cover shadow-sm"
                              />

                              <p className="mt-2 text-xs text-gray-400">
                                Select a new image above to replace it.
                              </p>

                            </div>
                          )}

                      </div>

                      {/* DESCRIPTION */}

                      <div className="sm:col-span-2">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Description
                        </label>

                        <textarea
                          name="description"
                          value={
                            serviceForm.description
                          }
                          onChange={
                            handleServiceChange
                          }
                          rows="4"
                          placeholder="Describe this service..."
                          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                        />

                      </div>

                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                      <button
                        type="button"
                        onClick={
                          closeServiceForm
                        }
                        disabled={
                          serviceSaving
                        }
                        className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={
                          serviceSaving
                        }
                        className="rounded-xl bg-purple-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {serviceSaving
                          ? "Uploading & Saving..."
                          : editingService
                          ? "Update Service"
                          : "Create Service"}
                      </button>

                    </div>

                  </form>

                </div>

              </div>

            )}

            {/* SERVICE CARDS */}

            {servicesLoading ? (

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-[380px] animate-pulse rounded-[24px] border border-purple-100 bg-white"
                    />
                  )
                )}

              </div>

            ) : services.length === 0 ? (

              <div className="rounded-[24px] border border-purple-100 bg-white px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                  <SparklesIcon />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-bold">
                  No services yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Create your first service
                  and it will automatically
                  appear on the homepage.
                </p>

                <button
                  type="button"
                  onClick={
                    openAddService
                  }
                  className="mt-6 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                >
                  + Create First Service
                </button>

              </div>

            ) : (

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {services.map(
                  (service) => (

                    <article
                      key={
                        service._id
                      }
                      className="group overflow-hidden rounded-[24px] border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100"
                    >

                      {/* IMAGE */}

                      <div className="relative h-52 overflow-hidden bg-purple-50">

                        {service.image ? (

                          <img
                            src={
                              service.image
                            }
                            alt={
                              service.name
                            }
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            onError={(
                              e
                            ) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm">
                              <SparklesIcon />
                            </div>

                          </div>

                        )}

                        {service.category && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-purple-700 shadow-sm backdrop-blur">
                            {
                              service.category
                            }
                          </span>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="p-5">

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <h3 className="font-serif text-xl font-bold text-gray-950">
                              {
                                service.name
                              }
                            </h3>

                            {service.duration ? (
                              <p className="mt-1 text-xs font-semibold text-purple-600">
                                {
                                  service.duration
                                }{" "}
                                minutes
                              </p>
                            ) : null}

                          </div>

                          <div className="shrink-0 rounded-xl bg-purple-50 px-3 py-2">

                            <p className="text-xs font-bold text-purple-700">
                              PKR
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                              {Number(
                                service.price ||
                                  0
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>

                        <p className="mt-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
                          {service.description ||
                            "A premium beauty service designed around your individual needs."}
                        </p>

                        <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">

                          <button
                            type="button"
                            onClick={() =>
                              openEditService(
                                service
                              )
                            }
                            className="flex-1 rounded-xl border border-purple-100 bg-purple-50 px-4 py-2.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteService(
                                service._id
                              )
                            }
                            className="flex-1 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

          </section>

          {/* STAFF */}

          <section
            id="staff"
            className="mt-12"
          >

            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                  Team Management
                </p>

                <h2 className="mt-1 font-serif text-2xl font-bold text-gray-950 sm:text-3xl">
                  Staff
                </h2>

              </div>

              <button
                type="button"
                onClick={
                  openAddStaff
                }
                className="flex w-fit items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800"
              >
                <PlusIcon />
                Add Staff
              </button>

            </div>

            {/* STAFF CARDS */}

            {staffLoading ? (

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-[270px] animate-pulse rounded-[24px] border border-purple-100 bg-white"
                    />
                  )
                )}

              </div>

            ) : staff.length === 0 ? (

              <div className="rounded-[24px] border border-purple-100 bg-white px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                  <UsersIcon />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-bold">
                  No staff members yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Add your salon team members
                  so you can manage your staff
                  from one place.
                </p>

                <button
                  type="button"
                  onClick={
                    openAddStaff
                  }
                  className="mt-6 flex mx-auto items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                >
                  <PlusIcon />
                  Add First Staff Member
                </button>

              </div>

            ) : (

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                {staff.map(
                  (member) => (

                    <article
                      key={
                        member._id
                      }
                      className="group rounded-[24px] border border-purple-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-center gap-4">

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-violet-200 text-lg font-bold text-purple-700">
                            {getStaffInitials(
                              member.name
                            )}
                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-serif text-xl font-bold text-gray-950">
                              {
                                member.name
                              }
                            </h3>

                            <span className="mt-1 inline-flex rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] text-purple-700">
                              {
                                member.role ||
                                "Staff"
                              }
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="mt-6 space-y-3">

                        {member.phone && (

                          <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">

                            <span className="text-xs font-medium text-gray-400">
                              Phone
                            </span>

                            <span className="text-sm font-semibold text-gray-700">
                              {
                                member.phone
                              }
                            </span>

                          </div>

                        )}

                        {member.experience && (

                          <div className="flex items-center justify-between rounded-xl bg-purple-50 px-4 py-3">

                            <span className="text-xs font-medium text-gray-400">
                              Experience
                            </span>

                            <span className="text-sm font-semibold text-purple-700">
                              {
                                member.experience
                              }
                            </span>

                          </div>

                        )}

                      </div>

                      <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">

                        <button
                          type="button"
                          onClick={() =>
                            openEditStaff(
                              member
                            )
                          }
                          className="flex-1 rounded-xl border border-purple-100 bg-purple-50 px-4 py-2.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteStaff(
                              member._id
                            )
                          }
                          className="flex-1 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                        >
                          Delete
                        </button>

                      </div>

                    </article>

                  )
                )}

              </div>

            )}

          </section>

          {/* STATUS + ACCOUNT */}

          <section className="mt-12 grid gap-5 xl:grid-cols-2">

            {/* STATUS */}

            <div className="rounded-[24px] border border-purple-100 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                    Analytics
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-bold">
                    Appointment Status
                  </h3>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <DashboardIcon />
                </div>

              </div>

              <div className="mt-7 space-y-5">

                {[
                  [
                    "Pending",
                    overview.pending ??
                      0,
                  ],
                  [
                    "In Progress",
                    overview.inProgress ??
                      0,
                  ],
                  [
                    "Complete",
                    overview.complete ??
                      0,
                  ],
                  [
                    "Cancelled",
                    overview.cancelled ??
                      0,
                  ],
                ].map(
                  ([label, value]) => {

                    const total =
                      overview.totalAppointments ||
                      appointments.length ||
                      0;

                    const percentage =
                      total > 0
                        ? Math.min(
                            100,
                            (value /
                              total) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={label}
                      >

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-sm font-medium text-gray-600">
                            {label}
                          </span>

                          <span className="text-sm font-bold text-gray-900">
                            {value}
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-purple-50">

                          <div
                            className="h-full rounded-full bg-purple-600 transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* ACCOUNT */}

            <div className="rounded-[24px] border border-purple-100 bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                    Administration
                  </p>

                  <h3 className="mt-1 font-serif text-2xl font-bold">
                    Admin Account
                  </h3>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white">
                  <UsersIcon />
                </div>

              </div>

              <div className="mt-7 rounded-2xl bg-purple-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-700 text-lg font-bold text-white">
                    {(user?.name ||
                      "A")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <p className="font-semibold text-gray-900">
                      {user?.name ||
                        "Administrator"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {user?.email ||
                        "Not available"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-gray-100 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-gray-400">
                    Account Type
                  </p>

                  <p className="mt-2 text-sm font-semibold text-purple-700">
                    Administrator
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-100 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-gray-400">
                    Team Members
                  </p>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {staff.length} Staff
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="mt-14 border-t border-purple-100 py-7">

            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

              <p className="text-xs text-gray-400">
                ©{" "}
                {new Date().getFullYear()}{" "}
                Lumière Beauty Studio.
                All rights reserved.
              </p>

              <a
                href="/"
                className="text-xs font-semibold text-purple-600 hover:text-purple-800"
              >
                View Customer Website →
              </a>

            </div>

          </footer>

        </main>

      </div>

      {/* STAFF MODAL */}

      {showStaffForm && (

        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-sm">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-purple-100 bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-purple-100 bg-white px-6 py-5 sm:px-8">

              <div>

                <p className="text-xs font-bold uppercase tracking-[2px] text-purple-600">
                  {editingStaff
                    ? "Edit Staff"
                    : "New Staff"}
                </p>

                <h3 className="mt-1 font-serif text-2xl font-bold text-gray-950">
                  {editingStaff
                    ? "Update team member"
                    : "Add a team member"}
                </h3>

              </div>

              <button
                type="button"
                onClick={
                  closeStaffForm
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition hover:bg-purple-50 hover:text-purple-700"
              >
                <CloseIcon />
              </button>

            </div>

            <form
              onSubmit={
                handleStaffSubmit
              }
              className="p-6 sm:p-8"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      staffForm.name
                    }
                    onChange={
                      handleStaffChange
                    }
                    required
                    placeholder="Sarah Khan"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />

                </div>

                {/* PHONE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={
                      staffForm.phone
                    }
                    onChange={
                      handleStaffChange
                    }
                    placeholder="03XX XXXXXXX"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />

                </div>

                {/* ROLE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Role *
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={
                      staffForm.role
                    }
                    onChange={
                      handleStaffChange
                    }
                    required
                    placeholder="Hair Stylist"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />

                </div>

                {/* EXPERIENCE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={
                      staffForm.experience
                    }
                    onChange={
                      handleStaffChange
                    }
                    placeholder="5 years"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                  />

                </div>

              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeStaffForm
                  }
                  className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    staffSaving
                  }
                  className="rounded-xl bg-purple-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {staffSaving
                    ? "Saving..."
                    : editingStaff
                    ? "Update Staff"
                    : "Create Staff"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminDashboard;