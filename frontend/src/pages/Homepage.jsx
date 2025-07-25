import React from "react";
import AppointmentForm from "../Components/AppointmentForm";
import DoctorCard from "../Components/DoctorCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
  // State for doctor slider
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  // State for appointment booking
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState(
    new Set(["10:00 AM", "2:00 PM"])
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Dentistry",
      image:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Orthodontics",
      image:
        "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Pediatric Dentistry",
      image:
        "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const services = [
    "General Checkup",
    "Teeth Cleaning",
    "Teeth Whitening",
    "Root Canal",
    "Dental Implants",
    "Orthodontics",
  ];

  const blogPosts = [
    {
      title: "5 Tips for Better Oral Hygiene",
      excerpt:
        "Learn the essential habits that will keep your teeth healthy and strong.",
      date: "March 15, 2024",
      image:
        "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Understanding Root Canal Treatment",
      excerpt:
        "Everything you need to know about root canal procedures and recovery.",
      date: "March 10, 2024",
      image:
        "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Benefits of Regular Dental Checkups",
      excerpt:
        "Why preventive care is the best investment in your oral health.",
      date: "March 5, 2024",
      image:
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctorIndex(
      (prev) => (prev - 1 + doctors.length) % doctors.length
    );
  };

  const handleSlotSelect = (slot) => {
    if (!bookedSlots.has(slot)) {
      setSelectedSlot(slot);
    }
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
    <>
      <section
        id="home"
        className="bg-gradient-to-r from-blue-50 to-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Smile is Our{" "}
                <span className="text-blue-600">Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience exceptional dental care with our team of expert
                professionals. We're committed to providing the highest quality
                treatment in a comfortable, modern environment.
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center">
                Book Your Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevDoctor}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextDoctor}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-center">
                  <img
                    src={doctors[currentDoctorIndex].image}
                    alt={doctors[currentDoctorIndex].name}
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900">
                    {doctors[currentDoctorIndex].name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {doctors[currentDoctorIndex].specialty}
                  </p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DoctorCard doctors={doctors} />

      <AppointmentForm
        formData={formData}
        setFormData={setFormData}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        bookedSlots={bookedSlots}
        setBookedSlots={setBookedSlots}
        timeSlots={timeSlots}
        services={services}
      />
    </>
  );
}
