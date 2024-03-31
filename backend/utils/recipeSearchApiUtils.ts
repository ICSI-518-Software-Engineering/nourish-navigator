import { z } from "zod";
import { appId, appKey, edamamApi } from "./edamamApiUtils";
import { RecipeApiResponseType } from "./mealPlannerApiUtils";

const recipeSearchZodSchema = z.object({
  keywords: z.string(),
  allergies: z.array(z.string()).optional(),
  diets: z.array(z.string()).optional(),
  maxCalories: z.union([z.string(), z.number()]).optional(),
});

export type RecipeSearchDataType = z.infer<typeof recipeSearchZodSchema>;

export const validateRecipeSearchRequest = (data: RecipeSearchDataType) => {
  return recipeSearchZodSchema.parse(data);
};

export const searchForRecipes = async (data: RecipeSearchDataType) => {
  const urlParams: Record<string, unknown> = {
    q: data.keywords,
    app_id: appId,
    app_key: appKey,
  };

  if (data.allergies) {
    data.allergies.forEach((allergy) => {
      urlParams.health = allergy;
    });
  }
  if (data.diets) {
    data.diets.forEach((diet) => {
      urlParams.diet = diet;
    });
  }
  if (data.maxCalories) {
    urlParams.calories = data.maxCalories;
  }

  const recipes = await edamamApi.get<RecipeApiResponseType>("/search", {
    params: urlParams,
  });
  return recipes.data?.hits?.map?.((r) => r?.recipe);
};
