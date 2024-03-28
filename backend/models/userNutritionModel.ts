import mongoose from "mongoose";
import { z } from "zod";

export const MongooseUserNutritionSchema = new mongoose.Schema({
  calorieTarget: {
    type: String,
  },
  proteinTarget: {
    type: String,
  },
  fatTarget: {
    type: String,
  },
  carbTarget: {
    type: String,
  }
});

export const userNutritionZodSchema = z.object({
  calorieTarget: z.string().optional(),
  proteinTarget: z.string().optional(),
  fatTarget: z.string().optional(),
  carbTarget: z.string().optional(),
});

export type UserNutritionRequestDataType = z.infer<typeof userNutritionZodSchema>;

// Custom Validator
export const validateNewUserProfileRequest = (
  body: UserNutritionRequestDataType
) => {
  const res = userNutritionZodSchema.parse(body);
  return res;
};