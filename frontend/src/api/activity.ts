import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { queryClient } from "@/lib/TanstackProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
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

/**
 * Get User Activity Service
 */
export type GetUserActivityServiceResponseType = {
  _id: string;
  date: string | Date;
  totalCalories: number;
  totalFat: number;
  totalProtein: number;
  userId: string;
};
const getUserActivityService = async (userId?: string) => {
  const res = await http.get<GetUserActivityServiceResponseType[]>(
    `/activity/${userId}`
  );
  return res.data;
};

export const useGetUserActivityService = () => {
  const user = getLoggedInUserDetails();
  return useQuery({
    queryKey: ["getUserActivityService", user?._id],
    queryFn: () => getUserActivityService(user?._id),
    enabled: Boolean(user?._id),
  });
};