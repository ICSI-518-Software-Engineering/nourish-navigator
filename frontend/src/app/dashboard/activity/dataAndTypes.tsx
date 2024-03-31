import { z } from "zod";

export const userActivityZodSchema = z.object({
  totalCalories: z.number(),
  totalFat: z.number(),
  totalProtein: z.number(),
  date: z.union([z.string(), z.date()]),
  userId: z.string(),
  _id: z.string().optional(),
});

export type UserActivityType = z.infer<typeof userActivityZodSchema>;