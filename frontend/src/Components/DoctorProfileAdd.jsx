import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../api/doctorService.js";

const DoctorProfile = () => {
  const queryClient = useQueryClient();

  // Form state (aligned with backend model)
  const [formData, setFormData] = useState({
    doctorName: "",
    degrees: "",
    specialization: "",
    designation: "",
    description: "",
    workingHospital: "",
    doctorPhoneNumbers: "",
    serialNumbers: "",
    visitingHours: "",
    image: null,
  });

  const [editingDoctor, setEditingDoctor] = useState(null);
  const [flipped, setFlipped] = useState({});

  // Fetch doctors
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (formData) => addDoctor(formData),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateDoctor(id, formData),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDoctor(id),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDoctor) {
      updateMutation.mutate({ id: editingDoctor._id, formData });
      setEditingDoctor(null);
    } else {
      addMutation.mutate(formData);
    }

    setFormData({
      doctorName: "",
      degrees: "",
      specialization: "",
      designation: "",
      description: "",
      workingHospital: "",
      doctorPhoneNumbers: "",
      serialNumbers: "",
      visitingHours: "",
      image: null,
    });
  };

  // Edit doctor
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      doctorName: doctor.doctorName || "",
      degrees: doctor.degrees || "",
      specialization: doctor.specialization || "",
      designation: doctor.designation || "",
      description: doctor.description || "",
      workingHospital: doctor.workingHospital || "",
      doctorPhoneNumbers: doctor.doctorPhoneNumbers || "",
      serialNumbers: doctor.serialNumbers || "",

      visitingHours: doctor.visitingHours || "",
      image: null,
    });
  };

  // Delete doctor
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Toggle flip
  const toggleFlip = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading doctors...</p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        Manage Doctors
      </h2>

      {/* Doctor Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="degrees"
            placeholder="Your Degrees"
            value={formData.degrees}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialized Field"
            value={formData.specialization}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation in Working Hospital"
            value={formData.designation}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="text"
            name="workingHospital"
            placeholder="Working Hospital Name"
            value={formData.workingHospital}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="doctorPhoneNumbers"
            placeholder="Phone Numbers (comma separated)"
            value={formData.doctorPhoneNumbers}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="serialNumbers"
            placeholder="Serial Numbers (comma separated)"
            value={formData.serialNumbers}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="visitingHours"
            placeholder="Visiting Hours: Example 6 to 10 Or 6-10"
            value={formData.visitingHours}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <textarea
          name="description"
          placeholder="Write a short Description of yourself"
          value={formData.description}
          onChange={handleChange}
          className="border w-full border-gray-300 p-5 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Image Upload */}
        <div className="flex items-center gap-4 mt-4">
          <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-400 transition relative overflow-hidden">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-center">Upload Image</span>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition shadow-md"
          >
            {editingDoctor ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </form>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="relative">
            {/* Flip Card */}
            <div
              onClick={() => toggleFlip(doc._id)}
              className="cursor-pointer perspective"
            >
              <div
                className={`relative w-full h-76 transition-transform duration-700 transform-style-preserve-3d ${
                  flipped[doc._id] ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg overflow-hidden">
                  {doc.imageUrl ? (
                    <img
                      src={doc.imageUrl}
                      alt={doc.doctorName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-48 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">
                      {doc.doctorName}
                    </h3>
                    <p className="text-gray-600">{doc.specialization}</p>
                    <p className="text-gray-500 text-sm line-clamp-3">
                      {doc.degrees}
                    </p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-50 rounded-lg shadow-lg p-4 flex flex-col justify-center items-start text-gray-800">
                  <h3 className="text-lg font-semibold mb-2">
                    {doc.doctorName}
                  </h3>
                  <p>
                    <span className="font-medium">Specialization:</span>{" "}
                    {doc.specialization}
                  </p>
                  <p>
                    <span className="font-medium">Degrees:</span> {doc.degrees}
                  </p>
                  <p>
                    <span className="font-medium">Designation:</span>{" "}
                    {doc.designation}
                  </p>
                  <p>
                    <span className="font-medium">Hospital:</span>{" "}
                    {doc.workingHospital}
                  </p>
                  <p>
                    <span className="font-medium">Phones:</span>{" "}
                    {doc.doctorPhoneNumbers}
                  </p>
                  <p>
                    <span className="font-medium">Serials:</span>{" "}
                    {doc.serialNumbers}
                  </p>
                  <p>
                    <span className="font-medium">Visiting Hours:</span>{" "}
                    {doc.visitingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit/Delete Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(doc);
                }}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(doc._id);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfile;
