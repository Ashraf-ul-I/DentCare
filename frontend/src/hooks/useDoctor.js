import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";

// ✅ Fetch all doctors
export const useDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5,
  });
};

// ✅ Add doctor
export const useAddDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
    },
  });
};

// ✅ Update doctor
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
    },
  });
};

// ✅ Delete doctor
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
    },
  });
};
