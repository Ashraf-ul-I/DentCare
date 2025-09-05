import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchHospitalImages,
  addHospitalImage,
  deleteHospitalImage,
} from "../api/hospitalService.js";

const HospitalImages = () => {
  const queryClient = useQueryClient();

  // State
  const [formData, setFormData] = useState({ image: null });

  // Queries
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["hospitalImages"],
    queryFn: fetchHospitalImages,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (formData) => addHospitalImage(formData),
    onSuccess: () => queryClient.invalidateQueries(["hospitalImages"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteHospitalImage(id),
    onSuccess: () => queryClient.invalidateQueries(["hospitalImages"]),
  });

  // Handle file change
  const handleChange = (e) => {
    setFormData({ image: e.target.files[0] });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    if (formData.image) form.append("image", formData.image);

    addMutation.mutate(form);

    setFormData({ image: null });
  };

  // Delete image
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading hospital images...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        Manage Hospital Images
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-4">
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
            Add Image
          </button>
        </div>
      </form>

      {/* Image List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={img.imageUrl}
              alt="Hospital"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <button
                onClick={() => handleDelete(img._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
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

export default HospitalImages;
