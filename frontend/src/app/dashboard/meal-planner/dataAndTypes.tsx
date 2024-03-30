/**
 * ====================================================================
 * ===================== MEAL PLANNER PAGE DATA =======================
 * ====================================================================
 */

import { SelectOptionType } from "@/components/CustomSelect";
import { z } from "zod";

export const mealsTimingsOptions: InputOptionsType[] = [
  {
    id: "breakfast",
    label: "Breakfast",
  },
  {
    id: "lunch",
    label: "Lunch",
  },
  {
    id: "dinner",
    label: "Dinner",
  },
];

export const mealPlanDurationOptions: InputOptionsType[] = [
  {
    id: "7",
    label: "Weekly",
  },
  {
    id: "14",
    label: "Bi-Weekly",
  },
  {
    id: "30",
    label: "Monthly",
  },
];

export const mealCategoriesOptions: SelectOptionType[] = [
  {
    value: "bread",
    label: "Bread",
  },
  {
    value: "biscuits and cookies",
    label: "Biscuits And Cookies",
  },
  {
    value: "cereals",
    label: "Cereals",
  },
  {
    value: "condiments and sauces",
    label: "Condiments And Sauces",
  },
  {
    value: "desserts",
    label: "Desserts",
  },
  {
    value: "drinks",
    label: "Drinks",
  },
  {
    value: "egg",
    label: "Egg",
  },
  {
    value: "ice cream and custard",
    label: "Ice Cream And Custard",
  },
  {
    value: "main course",
    label: "Main Course",
  },
  {
    value: "pancake",
    label: "Pancake",
  },
  {
    value: "pasta",
    label: "Pasta",
  },
  {
    value: "pastry",
    label: "Pastry",
  },
  {
    value: "pies and tarts",
    label: "Pies And Tarts",
  },
  {
    value: "pizza",
    label: "Pizza",
  },
  {
    value: "salad",
    label: "Salad",
  },
  {
    value: "sandwiches",
    label: "Sandwiches",
  },
  {
    value: "seafood",
    label: "Seafood",
  },
  {
    value: "soup",
    label: "Soup",
  },
];

export const mealPlannerFormZodSchema = z.object({
  noOfDays: z.string().min(1, { message: "Meal plan duration is required" }),
  mealsTimings: z
    .string()
    .array()
    .min(1, { message: "Select at least 1 meal time" }),
  minCaloriesPerDay: z
    .string()
    .min(0, { message: "Calories per day is required" }),
  maxCaloriesPerDay: z
    .string()
    .min(0, { message: "Calories per day is required" }),
  mealCategories: z.string().array().optional(),
});

export type MealPlannerFormDataType = z.infer<typeof mealPlannerFormZodSchema>;

export type InputOptionsType = {
  id: string;
  label: string;
};

export type MealPlanRecordType = {
  breakfast?: MealPlanRecordItemType;
  lunch?: MealPlanRecordItemType;
  dinner?: MealPlanRecordItemType;
  day: number;
};

export type MealPlanRecordItemType = {
  label: string;
  image: string;
  yield: 6;
  ingredientLines: string[];
  ingredients: MealPlanIngredientsType[];
  calories: number;
  totalNutrients: {
    FAT: MealPlanNutrientsType;
    CHOCDF: MealPlanNutrientsType;
    PROCNT: MealPlanNutrientsType;
  };
};

type MealPlanIngredientsType = {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
};

type MealPlanNutrientsType = {
  label: string;
  quantity: number;
  unit: string;
};
