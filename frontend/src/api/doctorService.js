import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/doctorProfile";

// ✅ Fetch all doctors (public route)
export const fetchDoctors = async () => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

// ✅ Add a doctor (admin only)
export const addDoctor = async (formData) => {
  const res = await axiosInstance.post(`${BASE_URL}/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Edit doctor (admin only)
export const updateDoctor = async ({ id, formData }) => {
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Delete doctor (admin only)
export const deleteDoctor = async (id) => {
  const res = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return res.data;
};
