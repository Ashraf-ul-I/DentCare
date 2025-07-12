import React from "react";
import { Calendar, Clock } from "lucide-react";

export default function AppointmentForm({
  formData,
  setFormData,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  bookedSlots,
  setBookedSlots,
  timeSlots,
  services,
}) {
  const handleSlotSelect = (slot) => {
    if (!bookedSlots.has(slot)) setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedSlot && formData.name && formData.email && formData.phone) {
      setBookedSlots((prev) => new Set([...prev, selectedSlot]));
      setSelectedSlot("");
      setFormData({ name: "", email: "", phone: "", service: "" });
      alert("Appointment booked successfully!");
    } else {
      alert("Please fill all fields and select a time slot.");
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <section className="py-20 bg-gray-50 scroll-smooth" id="appointment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600">
            Choose your preferred date and time
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Select Date
              </h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays()
                  .slice(0, 21)
                  .map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        selectedDate.toDateString() === date.toDateString()
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100 text-gray-700"
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  ))}
              </div>

              {/* Available Slots */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Available Slots
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      disabled={bookedSlots.has(slot)}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        bookedSlots.has(slot)
                          ? "bg-red-100 text-red-500 cursor-not-allowed"
                          : selectedSlot === slot
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-blue-100 text-gray-700"
                      }`}
                    >
                      {slot}
                      {bookedSlots.has(slot) && (
                        <div className="text-xs">Booked</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Information Form */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Patient Information
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedSlot && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected Slot:</strong> {selectedSlot} on{" "}
                      {selectedDate.toLocaleDateString()}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
