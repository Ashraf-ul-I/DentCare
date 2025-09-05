import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fetchHospitalImages } from "../api/hospitalService.js";

export default function HospitalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch hospital images from backend
  const {
    data: hospitalImages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hospitalImages"],
    queryFn: fetchHospitalImages,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: false,
    // refetchOnMount: "stale",
  });

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!hospitalImages.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hospitalImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hospitalImages]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % hospitalImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + hospitalImages.length) % hospitalImages.length
    );
  };

  // 🔹 Skeleton Loader
  if (isLoading && !hospitalImages.length) {
    return (
      <section className="py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Clinic
            </h2>
            <p className="text-xl text-gray-600">
              Get a glimpse of our facilities and environment
            </p>
          </div>

          {/* Skeleton container */}
          <div className="relative">
            <div className="overflow-hidden w-full rounded-2xl shadow-lg">
              <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || hospitalImages.length === 0) {
    return (
      <div className="py-20 text-center text-red-600">
        No hospital images found
      </div>
    );
  }

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Clinic
          </h2>
          <p className="text-xl text-gray-600">
            Get a glimpse of our facilities and environment
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={prevImage}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          {/* Motion wrapper that slides */}
          <div className="overflow-hidden w-full rounded-2xl shadow-lg">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {hospitalImages.map((image) => (
                <div key={image._id} className="min-w-full">
                  <img
                    src={image.imageUrl}
                    alt="Hospital"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Button */}
          <button
            onClick={nextImage}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
