import React, { useState, useMemo } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { appointmentService } from "../services/appointmentService";

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
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleSlotSelect = (slot) => {
    if (!bookedSlots.has(`${selectedDate.toDateString()}-${slot}`)) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = async() => {
    if (
      !selectedSlot ||
      !selectedDate ||
      !formData.name ||
      !formData.phone
    ) {
      alert("Please fill all the fields, select a date and time slot");
      return;
    }

    try {
      const appointmentData = {
        fullname: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointmentDate: selectedDate.toISOString(),
        timeSlot: selectedSlot,
      }

      const result = await appointmentService.bookAppointment(appointmentData);

      if(result.success){
        const bookingKey = `${selectedDate.toDateString()}-${selectedSlot}`;
        setBookedSlots((prev) => new Set([...prev, bookingKey]));

        setSelectedSlot("");
        setFormData({ name: "", email: "", phone: "", service: "" });

        alert(`Appointment booked successfully! ID: ${result.data._id}`);
      }
      
    } catch (error) {
      alert(`Booking failed\n ${error.message}`);
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const generateCalendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of the month and how many days it has
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get days from previous month to fill the grid
    const prevMonth = new Date(year, month - 1, 0);
    const daysFromPrevMonth = startingDayOfWeek;

    const days = [];

    // Add days from previous month (grayed out)
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isPast: date < new Date().setHours(0, 0, 0, 0),
      });
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      days.push({
        date,
        isCurrentMonth: true,
        isPast: date < today,
      });
    }

    // Add days from next month to complete the grid (6 weeks = 42 days)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false, isPast: false });
    }

    return days;
  }, [currentMonth]);

  const getAvailableSlots = () => {
    if (!selectedDate) return [];

    return timeSlots.filter((slot) => {
      const bookingKey = `${selectedDate.toDateString()}-${slot}`;
      return !bookedSlots.has(bookingKey);
    });
  };

  const getBookedSlotsForDate = () => {
    if (!selectedDate) return [];

    return timeSlots.filter((slot) => {
      const bookingKey = `${selectedDate.toDateString()}-${slot}`;
      return bookedSlots.has(bookingKey);
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Select Date
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <h4 className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
                    {monthNames[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </h4>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Days of week header */}
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

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2 mb-8">
                {generateCalendarDays.map((dayObj, index) => {
                  const { date, isCurrentMonth, isPast } = dayObj;
                  const isSelected =
                    selectedDate &&
                    selectedDate.toDateString() === date.toDateString();
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        !isPast && isCurrentMonth && setSelectedDate(date)
                      }
                      disabled={isPast || !isCurrentMonth}
                      className={`
                        p-3 text-sm rounded-lg transition-colors relative
                        ${
                          !isCurrentMonth
                            ? "text-gray-300 cursor-not-allowed"
                            : isPast
                            ? "text-gray-400 cursor-not-allowed bg-gray-50"
                            : isSelected
                            ? "bg-blue-600 text-white shadow-lg"
                            : isToday
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "hover:bg-blue-100 text-gray-700 hover:text-blue-600"
                        }
                      `}
                    >
                      {date.getDate()}
                      {isToday && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Available Slots for Selected Date */}
              {selectedDate && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Available Slots for {selectedDate.toLocaleDateString()}
                  </h4>

                  {getAvailableSlots().length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {getAvailableSlots().map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`
                            p-2 text-sm rounded-lg transition-colors
                            ${
                              selectedSlot === slot
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600"
                            }
                          `}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mb-4">
                      No available slots for this date.
                    </p>
                  )}

                  {/* Show booked slots for reference */}
                  {getBookedSlotsForDate().length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">
                        Booked Slots:
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {getBookedSlotsForDate().map((slot) => (
                          <div
                            key={slot}
                            className="p-2 text-sm rounded-lg bg-red-100 text-red-600 text-center"
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Patient Information Form */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Patient Information
              </h3>
              <div className="space-y-4">
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

                {selectedDate && selectedSlot && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Selected Appointment:</strong> {selectedSlot} on{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleBooking}
                  disabled={
                    !selectedDate ||
                    !selectedSlot ||
                    !formData.name ||
                    !formData.phone
                  }
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
