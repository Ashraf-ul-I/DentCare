function BlogSkeleton() {
  return (
    <div className="max-w-6xl mx-auto my-8 p-8 bg-white rounded-xl shadow-lg animate-pulse">
      {/* Back button skeleton */}
      <div className="w-32 h-10 bg-gray-300 rounded mb-6"></div>

      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-300 rounded mb-6"></div>

      {/* Title skeleton */}
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Date skeleton */}
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>

      {/* Content skeleton lines */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default BlogSkeleton;
