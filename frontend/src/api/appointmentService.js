// services/appointmentService.js
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/booking";

export const bookAppointment = async (data) => {
  const response = await axiosInstance.post(`${BASE_URL}/appointment`, data);
  return response.data; // should be { success, data, message }
};

export const fetchBookedSlots = async (selectedDate) => {
  if (!selectedDate) return [];
  const res = await axiosInstance.get(
    `${BASE_URL}/appointment/booked?date=${selectedDate.toISOString()}`
  );
  console.log("api response", res.data.data);
  return res.data.data;
};
