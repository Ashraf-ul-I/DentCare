import React from "react";

function DoctorSliderSkeleton() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-5 w-96 mx-auto bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="relative">
          <div className="overflow-hidden w-full">
            <div className="flex">
              <div className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Image skeleton */}
                <div className="md:w-1/2">
                  <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
                </div>

                {/* Info skeleton */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>

                  <div className="flex gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorSliderSkeleton;
