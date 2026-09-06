import api from "../api/axios";

// ========================================
// AUTH
// ========================================

export const loginAdmin = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

// ========================================
// SERVICES
// ========================================

// Get all services - Public
export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

// Get active services - Public
export const getActiveServices = async () => {
  const response = await api.get("/services/active");
  return response.data;
};

// Get single service - Public
export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

// Create service - Admin
// Supports FormData + image upload
export const createService = async (serviceData) => {
  const response = await api.post("/services", serviceData);

  return response.data;
};

// Update service - Admin
// Supports FormData + optional new image
export const updateService = async (id, serviceData) => {
  const response = await api.put(
    `/services/${id}`,
    serviceData
  );

  return response.data;
};

// Delete service - Admin
export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);

  return response.data;
};

// ========================================
// STAFF
// ========================================

// Get all staff - Public
export const getStaff = async () => {
  const response = await api.get("/staff");
  return response.data;
};

// Get active staff - Public
export const getActiveStaff = async () => {
  const response = await api.get("/staff/active");
  return response.data;
};

// Get single staff member - Public
export const getStaffById = async (id) => {
  const response = await api.get(`/staff/${id}`);
  return response.data;
};

// Create staff - Admin
export const createStaff = async (staffData) => {
  const response = await api.post("/staff", staffData);

  return response.data;
};

// Update staff - Admin
export const updateStaff = async (id, staffData) => {
  const response = await api.put(
    `/staff/${id}`,
    staffData
  );

  return response.data;
};

// Delete staff - Admin
export const deleteStaff = async (id) => {
  const response = await api.delete(`/staff/${id}`);

  return response.data;
};

// ========================================
// APPOINTMENTS
// ========================================

// Create appointment - Public
export const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

// Get all appointments - Admin
export const getAppointments = async () => {
  const response = await api.get("/appointments");

  return response.data;
};

// Get single appointment - Admin
export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);

  return response.data;
};

// Update appointment - Admin
export const updateAppointment = async (id, appointmentData) => {
  const response = await api.put(
    `/appointments/${id}`,
    appointmentData
  );

  return response.data;
};

// Delete appointment - Admin
export const deleteAppointment = async (id) => {
  const response = await api.delete(
    `/appointments/${id}`
  );

  return response.data;
};

// ========================================
// DASHBOARD
// ========================================

// Get dashboard statistics - Admin
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};