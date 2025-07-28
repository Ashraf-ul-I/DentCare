import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlogService } from "../api/blogsService";

export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlogService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};
