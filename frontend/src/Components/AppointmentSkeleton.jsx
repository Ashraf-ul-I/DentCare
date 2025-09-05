export default function AppointmentSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-md bg-white shadow-md space-y-2">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
