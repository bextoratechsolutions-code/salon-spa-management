import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Staff = () => {
  const [staff, setStaff] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    experience: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET ALL STAFF
  // =========================
  const fetchStaff = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/staff`);

      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }

      const data = await response.json();

      setStaff(data);
    } catch (error) {
      console.error("Fetch staff error:", error);
      alert("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE STAFF
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role) {
      alert("Name and role are required");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `${API_URL}/staff/${editingId}`
        : `${API_URL}/staff`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(editingId ? "Staff updated successfully" : "Staff added successfully");

      resetForm();
      fetchStaff();
    } catch (error) {
      console.error("Save staff error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT STAFF
  // =========================
  const handleEdit = (member) => {
    setEditingId(member._id);

    setFormData({
      name: member.name || "",
      phone: member.phone || "",
      role: member.role || "",
      experience: member.experience || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE STAFF
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/staff/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete staff");
      }

      alert("Staff deleted successfully");

      fetchStaff();
    } catch (error) {
      console.error("Delete staff error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      role: "",
      experience: "",
    });

    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Staff Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your salon staff members
          </p>
        </div>

        {/* FORM */}
        <div className="bg-[#111318] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId ? "Edit Staff Member" : "Add Staff Member"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter staff name"
                className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Role
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Hair Stylist"
                className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5 years"
                className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex gap-3">

              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : editingId
                  ? "Update Staff"
                  : "Add Staff"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>
              )}

            </div>
          </form>
        </div>

        {/* STAFF LIST */}
        <div className="bg-[#111318] border border-white/10 rounded-2xl overflow-hidden">

          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">
              All Staff
            </h2>
          </div>

          {loading && staff.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Loading staff...
            </div>
          ) : staff.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No staff members found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#08090d]">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-400">
                      Name
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400">
                      Role
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400">
                      Experience
                    </th>

                    <th className="text-right px-6 py-4 text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((member) => (
                    <tr
                      key={member._id}
                      className="border-t border-white/10 hover:bg-white/[0.02]"
                    >

                      <td className="px-6 py-4 font-medium">
                        {member.name}
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        {member.phone || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        {member.role}
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        {member.experience || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => handleEdit(member)}
                            className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(member._id)}
                            className="px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Staff;