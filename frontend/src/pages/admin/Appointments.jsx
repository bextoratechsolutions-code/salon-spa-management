import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../../services/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAppointments();

      if (response?.success) {
        setAppointments(response.appointments || []);
      } else {
        setAppointments(response?.appointments || []);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      setError("");

      const response = await updateAppointment(id, {
        status,
      });

      if (response?.success) {
        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment._id === id
              ? {
                  ...appointment,
                  ...response.appointment,
                }
              : appointment
          )
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update appointment"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteAppointment(id);

      setAppointments((currentAppointments) =>
        currentAppointments.filter(
          (appointment) => appointment._id !== id
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete appointment"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "border-yellow-400/20 bg-yellow-400/[0.05] text-yellow-300";

      case "In Progress":
        return "border-blue-400/20 bg-blue-400/[0.05] text-blue-300";

      case "Complete":
        return "border-green-400/20 bg-green-400/[0.05] text-green-300";

      case "Cancelled":
        return "border-red-400/20 bg-red-400/[0.05] text-red-300";

      default:
        return "border-white/[0.08] bg-white/[0.03] text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-[#c59d5f] mb-2">
              Admin Panel
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl">
              Appointments
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Manage all salon appointments
            </p>
          </div>

          <button
            onClick={loadAppointments}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 hover:text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-red-400/20 bg-red-400/[0.05] text-red-300 text-sm">
            <span>{error}</span>

            <button
              onClick={() => setError("")}
              className="text-red-300 hover:text-white text-lg"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-[#111218] border border-white/[0.07] rounded-xl overflow-hidden">
          {loading ? (
            <div className="min-h-[350px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-9 h-9 rounded-full border-2 border-[#c59d5f]/30 border-t-[#c59d5f] animate-spin" />

                <p className="text-sm text-gray-500">
                  Loading appointments...
                </p>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="min-h-[350px] flex flex-col items-center justify-center px-4 text-center">
              <div className="w-14 h-14 rounded-full border border-[#c59d5f]/20 bg-[#c59d5f]/5 flex items-center justify-center text-[#c59d5f] text-2xl mb-4">
                ◷
              </div>

              <h2 className="font-serif text-xl">
                No Appointments
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                There are no appointments to display.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Contact
                      </th>

                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Service
                      </th>

                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Staff
                      </th>

                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Date & Time
                      </th>

                      <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-[10px] font-semibold tracking-[1.5px] text-gray-500 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className="border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.015] transition-colors"
                      >
                        <td className="px-5 py-5">
                          <div>
                            <p className="text-sm text-white font-medium">
                              {appointment.customerName || "—"}
                            </p>

                            {appointment.email && (
                              <p className="text-xs text-gray-600 mt-1">
                                {appointment.email}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-gray-400">
                            {appointment.phone || "—"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-gray-300">
                            {appointment.service?.name || "—"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-gray-400">
                            {appointment.staff?.name || "Not assigned"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <p className="text-sm text-gray-300">
                            {formatDate(appointment.appointmentDate)}
                          </p>

                          <p className="text-xs text-gray-600 mt-1">
                            {appointment.appointmentTime || "—"}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <select
                            value={appointment.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(
                                appointment._id,
                                e.target.value
                              )
                            }
                            disabled={updatingId === appointment._id}
                            className={`px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer transition-all ${getStatusClass(
                              appointment.status
                            )} disabled:opacity-50 disabled:cursor-not-allowed`}
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

                        <td className="px-5 py-5 text-right">
                          <button
                            onClick={() =>
                              handleDelete(appointment._id)
                            }
                            disabled={
                              deletingId === appointment._id
                            }
                            className="px-3 py-2 rounded-lg border border-red-400/15 bg-red-400/[0.04] hover:bg-red-400/[0.1] text-red-300 text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingId === appointment._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-white/[0.06]">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {appointment.customerName || "—"}
                        </h3>

                        <p className="text-xs text-gray-600 mt-1">
                          {appointment.phone || "No phone"}
                        </p>
                      </div>

                      <select
                        value={appointment.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            appointment._id,
                            e.target.value
                          )
                        }
                        disabled={updatingId === appointment._id}
                        className={`px-2.5 py-2 rounded-lg border text-[11px] outline-none ${getStatusClass(
                          appointment.status
                        )} disabled:opacity-50`}
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
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-gray-600">
                          Service
                        </p>

                        <p className="text-sm text-gray-300 mt-1">
                          {appointment.service?.name || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-gray-600">
                          Staff
                        </p>

                        <p className="text-sm text-gray-300 mt-1">
                          {appointment.staff?.name ||
                            "Not assigned"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-gray-600">
                          Date
                        </p>

                        <p className="text-sm text-gray-300 mt-1">
                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-gray-600">
                          Time
                        </p>

                        <p className="text-sm text-gray-300 mt-1">
                          {appointment.appointmentTime || "—"}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-[1px] text-gray-600">
                          Notes
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {appointment.notes}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(appointment._id)
                      }
                      disabled={
                        deletingId === appointment._id
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-red-400/15 bg-red-400/[0.04] hover:bg-red-400/[0.1] text-red-300 text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === appointment._id
                        ? "Deleting..."
                        : "Delete Appointment"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;