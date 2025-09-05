import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/hospital-images";

// Fetch all hospital images
export const fetchHospitalImages = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Add hospital image
export const addHospitalImage = async (formData) => {
  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete hospital image
export const deleteHospitalImage = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
