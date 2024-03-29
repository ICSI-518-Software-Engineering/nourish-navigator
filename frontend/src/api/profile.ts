import { UserSessionDetailsType } from "@/app/(auth)/dataAndTypes";
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { UserProfileFormDataType } from "@/app/user-profile/dataAndTypes";
import { queryClient } from "@/lib/TanstackProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import http from "./http";

/**
 * Update User Profile Service
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
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

/**
 * Get User Profile Service
 */

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

/**
 * Get all User profiles Service
 */

export type GetAllUsersServiceResponseType = (UserSessionDetailsType & {
  userProfile: UserProfileFormDataType;
})[];

const getAllUsersService = async () => {
  const res = await http.get<GetAllUsersServiceResponseType>(`/user/profile`);
  return res.data;
};

export const useGetAllUserProfileService = () => {
  const user = getLoggedInUserDetails();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getAllUsersService(),
    enabled: Boolean(user && user.isAdmin),
  });
};

/**
 * Delete User Profile Service
 */
const deleteUserService = async (userId?: string) => {
  if (!userId) {
    return;
  }
  const res = await http.delete<string>(`/user/profile/${userId}`);
  return res.data;
};

export const useDeleteUserService = () => {
  return useMutation({
    mutationFn: deleteUserService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
