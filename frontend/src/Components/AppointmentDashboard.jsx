import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { format } from "date-fns";

const AppointmentDashboard = () => {
  const getTodayDateString = () => new Date().toISOString().split("T")[0];

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [timeError, setTimeError] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get("/booking/appointment/all", {
        params: { date: selectedDate, page, limit },
      });
      setAppointments(response.data.data.appointments);
      setTotal(response.data.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, page]);

  const fetchBookedSlotsForDate = async (date, currentTimeSlot) => {
    try {
      const res = await axiosInstance.get("/booking/appointment/booked", {
        params: { date: format(new Date(date), "yyyy-MM-dd") },
      });
      const filteredSlots = res.data.data.filter(
        (slot) => slot !== currentTimeSlot
      );
      setBookedSlots(filteredSlots);
    } catch {
      setBookedSlots([]);
    }
  };

  const handleEditClick = (appt) => {
    setEditingId(appt._id);
    setNewTime(appt.timeSlot);
    setNewStatus(appt.status);
    const apptDate = new Date(appt.appointmentDate).toISOString().split("T")[0];
    fetchBookedSlotsForDate(apptDate, appt.timeSlot);
    setTimeError("");
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setNewTime(value);
    setTimeError(
      bookedSlots.includes(value) ? "This time slot is already booked." : ""
    );
  };

  const handleSaveEdit = async (id) => {
    if (timeError) return;
    try {
      await axiosInstance.patch(`/booking/appointment/edit/${id}`, {
        timeSlot: newTime,
        status: newStatus,
      });
      setEditingId(null);
      await fetchAppointments();
    } catch {
      setError("Failed to update appointment");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setError("");
    setTimeError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      await axiosInstance.delete(`/booking/appointment/delete/${id}`);
      fetchAppointments();
    } catch {
      setError("Failed to delete appointment");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Appointments Dashboard
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <label className="font-semibold">Search by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md shadow-sm w-full sm:w-auto"
        />
      </div>

      {loading ? (
        <p className="text-blue-500 text-center">Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <p>
                  <strong>Name:</strong> {appt.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {appt.email}
                </p>
                <p>
                  <strong>Phone:</strong> {appt.phone}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.appointmentDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {editingId === appt._id ? (
                    <input
                      type="text"
                      value={newTime}
                      onChange={handleTimeChange}
                      className={`border p-1 rounded w-full ${
                        timeError ? "border-red-500" : ""
                      }`}
                    />
                  ) : (
                    appt.timeSlot
                  )}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {editingId === appt._id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option value="Not Checked">Not Checked</option>
                      <option value="Checked">Checked</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`${
                        appt.status === "Checked"
                          ? "text-green-500 font-bold text-lg"
                          : "text-black font-bold text-lg"
                      }`}
                    >
                      {appt.status}
                    </span>
                  )}
                </p>
              </div>

              {timeError && (
                <p className="text-red-500 text-sm mt-1">{timeError}</p>
              )}

              <div className="mt-4 flex gap-2">
                {editingId === appt._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(appt._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={!!timeError}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(appt)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentDashboard;
