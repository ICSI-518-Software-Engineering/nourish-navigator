import { z } from "zod";

export const userProfileSchema = z.object({
  age: z
    .string()
    .refine((item) => Number(item), { message: "Age should be a number" }),
  gender: z.string(),
  height: z.string(),
  weight: z.string(),
  dietaryPreference: z.string().optional(),
  cuisinePreferences: z.string().array().optional(),
  medicalHistory: z.string().array().optional(),
  allergies: z.string().array().optional(),
});

export type UserProfileFormDataType = z.infer<typeof userProfileSchema>;
