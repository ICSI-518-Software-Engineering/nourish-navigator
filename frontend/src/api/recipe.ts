/**
 * Recipe Search Service
 */

import { RecipeSearchFormDataType } from "@/app/dashboard/recipes/dataAndTypes";
import { queryClient } from "@/lib/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import http from "./http";

const recipeSearchService = async (data: RecipeSearchFormDataType) => {
  const res = await http.post<string>(`/recipes`, data);
  return res.data;
};

export const useRecipeSearchService = () => {
  return useMutation({
    mutationFn: recipeSearchService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
