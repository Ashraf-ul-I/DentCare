import { useDoctors, useDeleteDoctor } from "../hooks/useDoctors";

const DoctorList = () => {
  const { data: doctors = [], isLoading } = useDoctors();
  const { mutate: deleteDoctor } = useDeleteDoctor();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {doctors.map((doc) => (
        <div
          key={doc._id}
          className="border rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={doc.imageUrl}
            alt={doc.doctorName}
            className="w-32 h-32 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold mt-2">{doc.doctorName}</h2>
          <p className="text-sm text-gray-600">{doc.specialization}</p>
          <p className="text-sm">{doc.description}</p>
          <button
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => deleteDoctor(doc._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
