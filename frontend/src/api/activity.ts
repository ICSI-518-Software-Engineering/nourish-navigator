import { queryClient } from "@/lib/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import http from "./http";

/**
 * Update Activity Service
 */

type UpdateUserActivityServiceDataType = {
  mealTime: string;
  consumption: string;
  userId: string;
};

const updateUserActivityService = async (
  data: UpdateUserActivityServiceDataType
) => {
  const res = await http.post(`/activity/${data.userId}`, data);
  return res.data;
};

export const useUpdateUserActivityService = () => {
  return useMutation({
    mutationFn: updateUserActivityService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
