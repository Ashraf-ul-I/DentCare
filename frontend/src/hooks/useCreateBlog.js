import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogService } from "../api/blogsService";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};
