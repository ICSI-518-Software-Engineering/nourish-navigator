import { SelectOptionType } from "@/components/CustomSelect";
import { z } from "zod";

export const recipeSearchZodSchema = z.object({
  keywords: z.string().min(1, { message: "required" }).trim(),
  allergies: z.array(z.string()).optional(),
  diets: z.array(z.string()).optional(),
  maxCalories: z.union([z.string(), z.number()]).optional(),
});

export type RecipeSearchFormDataType = z.infer<typeof recipeSearchZodSchema>;

export const allergiesOptions: SelectOptionType[] = [
  {
    label: "Celery-free",
    value: "celery-free",
  },
  {
    label: "Dairy-free",
    value: "dairy-free",
  },
  {
    label: "Egg-free",
    value: "egg-free",
  },
  {
    label: "Fish-free",
    value: "fish-free",
  },
  {
    label: "Gluten-free",
    value: "gluten-free",
  },
  {
    label: "Peanut-free",
    value: "peanut-free",
  },
  {
    label: "Alcohol-free",
    value: "alcohol-free",
  },
];

export const dietOptions: SelectOptionType[] = [
  {
    label: "Balanced",
    value: "balanced",
  },
  {
    label: "High-Fiber",
    value: "high-fiber",
  },
  {
    label: "High-Protein",
    value: "high-protein",
  },
  {
    label: "Low-Carb",
    value: "low-carb",
  },
  {
    label: "Low-Fat",
    value: "low-fat",
  },
  {
    label: "Low-Sodium",
    value: "low-sodium",
  },
];
