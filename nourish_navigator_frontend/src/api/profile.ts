import { UserProfileFormDataType } from "@/app/user-profile/dataAndTypes";
import { useMutation } from "@tanstack/react-query";
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
