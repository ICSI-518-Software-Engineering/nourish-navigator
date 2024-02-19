import { z } from "zod";

export const userProfileSchema = z.object({
  dob: z.date(),
  height: z.string(),
  weight: z.string(),
  dietaryPreference: z.string().optional(),
  cuisinePreferences: z.string().array().optional(),
  medicalHistory: z.string().optional(),
  allergies: z.string().array().optional(),
});

export type UserProfileFormDataType = z.infer<typeof userProfileSchema>;
