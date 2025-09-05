import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { fetchDoctors } from "../api/doctorService";
import { motion } from "framer-motion";
import DoctorSliderSkeleton from "./DoctorSliderSkeleton";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function DoctorSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch doctors from backend
  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // keep cached for 10 min (v5: gcTime)
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    placeholderData: (prev) => prev, // show cached data instantly
  });

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!doctors.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [doctors]);

  const nextDoctor = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  if (isLoading && !doctors.length) {
    return <DoctorSliderSkeleton />;
  }

  if (isError || doctors.length === 0) {
    return (
      <div className="py-20 text-center text-red-600">
        Failed to load doctors
      </div>
    );
  }

  return (
    <section className="py-16  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-xl text-gray-600">
            Our experienced team is dedicated to your oral health
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={prevDoctor}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          {/* Motion wrapper that slides */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Doctor Image */}
                  <div className="md:w-1/2">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.doctorName}
                      className="w-full h-96 object-contain object-top"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {doctor.doctorName}
                    </h3>
                    <p className="text-blue-600 text-lg font-medium mb-4">
                      {doctor.degrees}
                    </p>
                    <p className="text-blue-600 text-lg font-medium mb-4">
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {doctor.visitingHours ? doctor.visitingHours + " PM" : ""}
                    </p>

                    <div className="flex gap-3">
                      <HashLink
                        smooth
                        to={"/#appointment"}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                      >
                        Book Appointment
                      </HashLink>
                      <Link
                        to={"/about-us"}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Button */}
          <button
            onClick={nextDoctor}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
