import { useQuery } from "@tanstack/react-query";

import { fetchBlogService } from "../api/blogsService";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["getBlogs"],
    queryFn: () => fetchBlogService(),
    staleTime: 1000 * 60 * 2, //when the date is already clicked means it fetched so before 5 minutes if user clicked again and again the same date the query will not fetched data it will show from its cached
  });
};
