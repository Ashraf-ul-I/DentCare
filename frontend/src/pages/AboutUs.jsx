import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors } from "../api/doctorService.js";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import DoctorSliderSkeleton from "../Components/DoctorSliderSkeleton";

export default function AboutUs() {
  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isLoading && !doctors.length) return <DoctorSliderSkeleton />;
  if (isError || doctors.length === 0)
    return (
      <div className="py-20 text-center text-red-600">
        Failed to load doctor details
      </div>
    );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Our Doctors
          </h1>
          <p className="text-lg text-gray-600">
            Meet our expert team dedicated to your oral health
          </p>
        </div>

        {/* Zigzag Doctor Sections */}
        <div className="space-y-16">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Doctor Image */}
              <div className="md:w-1/2 w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.doctorName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Doctor Details */}
              <div className="md:w-1/2 w-full flex flex-col">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {doctor.doctorName}
                </h3>
                <p className="text-blue-600 text-xl font-medium mb-3">
                  {doctor.specialization}
                </p>
                <p className="text-gray-600 mb-4">{doctor.description}</p>

                <button className="mt-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition w-max">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
