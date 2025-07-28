// services/appointmentService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/booking";

export const bookAppointment = async (data) => {
  const response = await axios.post(`${BASE_URL}/appointment`, data);
  return response.data; // should be { success, data, message }
};

export const fetchBookedSlots = async (selectedDate) => {
  if (!selectedDate) return [];
  const res = await axios.get(
    `${BASE_URL}/appointment/booked?date=${selectedDate.toISOString()}`
  );
  console.log("api response", res.data.data);
  return res.data.data;
};
