import { useQuery } from "@tanstack/react-query";

import { fetchBookedSlots } from "../api/appointmentService.js";

export const useBookedSlots = (selectedDate) => {
  return useQuery({
    queryKey: ["bookedSlots", selectedDate],
    queryFn: () => fetchBookedSlots(selectedDate),
    enabled: !!selectedDate,
    staleTime: 1000 * 60 * 5, //when the date is already clicked means it fetched so before 5 minutes if user clicked again and again the same date the query will not fetched data it will show from its cached
  });
};
