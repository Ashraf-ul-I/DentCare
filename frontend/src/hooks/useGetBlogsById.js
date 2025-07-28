import { useQuery } from "@tanstack/react-query";
import { fetchBlogByIdService } from "../api/blogsService"; // You need to create this function

export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ["getBlog", id],
    queryFn: () => fetchBlogByIdService(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
};
