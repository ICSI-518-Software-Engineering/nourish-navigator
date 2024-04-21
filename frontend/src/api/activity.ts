import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { MealPlanRecordItemType } from "@/app/dashboard/meal-planner/dataAndTypes";
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
  recipe?: MealPlanRecordItemType;
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
  currentWeight: number;
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

/**
 * update user weight service
 */
export type UpdateUserWeightServiceDataType = {
  userId?: string;
  weight: number;
};

const updateUserWeightService = async (
  data: UpdateUserWeightServiceDataType
) => {
  const res = await http.post<string>(
    `/activity/current-weight/${data.userId}`,
    data
  );
  return res.data;
};

export const useUpdateUserWeightService = () => {
  return useMutation({
    mutationFn: updateUserWeightService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

/**
 * Add other food item to meal plan
 */
export type AddNewRecipeToMealPlanServiceDataType = {
  userId?: string;
  recipe: MealPlanRecordItemType;
};
const addNewRecipeToMealPlanService = async (
  data: AddNewRecipeToMealPlanServiceDataType
) => {
  const res = await http.post<string>(
    `/activity/add-other-recipe/${data.userId}`,
    data.recipe
  );
  return res.data;
};
export const useAddNewRecipeToMealPlanService = () => {
  return useMutation({
    mutationFn: addNewRecipeToMealPlanService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

/**
 * Add other food item to meal plan
 */
export type RemoveUserAddedRecipeServiceDataType = {
  userId?: string;
  recipeUri: string;
};
const removeUserAddedRecipeService = async (
  data: RemoveUserAddedRecipeServiceDataType
) => {
  const res = await http.delete<string>(
    `/activity/remove-other-recipe/${data.userId}`,
    { params: { recipeUri: data.recipeUri } }
  );
  return res.data;
};
export const useRemoveUserAddedRecipeService = () => {
  return useMutation({
    mutationFn: removeUserAddedRecipeService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};