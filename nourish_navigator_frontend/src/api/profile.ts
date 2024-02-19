import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { UserProfileFormDataType } from "@/app/user-profile/dataAndTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import http from "./http";

/**
 * User Profile Service
 */

const updateUserProfileService = async (
  data: UserProfileFormDataType & { userId: string }
) => {
  const { userId, ...rest } = data;
  const res = await http.post<string>(`/user/profile/${userId}`, rest);
  return res.data;
};

export const useUpdateUserProfileService = () => {
  return useMutation({
    mutationFn: updateUserProfileService,
  });
};

const getUserProfileService = async (userId: string) => {
  const res = await http.get<UserProfileFormDataType>(
    `/user/profile/${userId}`
  );
  return res.data;
};

export const useGetUserProfileService = () => {
  const user = getLoggedInUserDetails();

  return useQuery({
    queryKey: ["profile", user?._id],
    queryFn: () => getUserProfileService(user?._id ?? ""),
    enabled: Boolean(user),
  });
};
