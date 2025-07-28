import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
