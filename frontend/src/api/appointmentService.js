// services/appointmentService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/booking";

export const bookAppointment = async (data) => {
  const response = await axios.post(`${BASE_URL}/appointment`, data);
  return response.data; // should be { success, data, message }
};
