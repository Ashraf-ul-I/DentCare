import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../api/appointmentService";

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: bookAppointment,
  });
};
