import { z } from "zod";

export const userProfileSchema = z.object({
  age: z.number(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
  dietaryPreference: z.string().optional(),
  cuisinePreferences: z.string().array().optional(),
  medicalHistory: z.string().array().optional(),
  allergies: z.string().array().optional(),
});

export type UserProfileFormDataType = z.infer<typeof userProfileSchema>;
