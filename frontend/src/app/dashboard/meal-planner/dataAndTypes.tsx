/**
 * ====================================================================
 * ===================== MEAL PLANNER PAGE DATA =======================
 * ====================================================================
 */

import { CookingPotIcon, EggFriedIcon, UtensilsIcon } from "lucide-react";
import { z } from "zod";

export const mealsTimingsOptions = [
  {
    id: "breakfast",
    label: "Breakfast",
    icon: <EggFriedIcon />,
  },
  {
    id: "lunch",
    label: "Lunch",
    icon: <CookingPotIcon />,
  },
  {
    id: "dinner",
    label: "Dinner",
    icon: <UtensilsIcon />,
  },
];

export const mealPlannerFormZodSchema = z.object({
  noOfDays: z.number().min(1),
  mealsTimings: z
    .string()
    .array()
    .min(1, { message: "Select at least 1 meal time" }),
  minCaloriesPerDay: z.number(),
  maxCaloriesPerDay: z.number(),
});

export type MealPlannerFormDataType = z.infer<typeof mealPlannerFormZodSchema>;
