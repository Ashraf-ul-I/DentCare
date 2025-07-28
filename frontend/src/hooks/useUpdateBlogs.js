import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlogService } from "../api/blogsService";

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateBlogService({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};
