import mongoose from "mongoose";
import { z } from "zod";

export const MongooseUserMealPlanSchema = new mongoose.Schema<UserMealPlanType>(
  {
    noOfDays: {
      type: String,
      required: true,
    },
    mealsTimings: {
      type: [String],
      required: true,
    },
    minCaloriesPerDay: {
      type: String,
      required: true,
    },
    maxCaloriesPerDay: {
      type: String,
      required: true,
    },
    mealCategories: [String],
    // userId: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

// const MealPlan = mongoose.model("mealplan", MongooseUserMealPlanSchema);
// export default MealPlan;

export const userMealPlanZodSchema = z.object({
  noOfDays: z
    .string({ required_error: "Meal plan duration is required" })
    .min(1, { message: "Meal plan duration is required" }),
  mealsTimings: z
    .string({ required_error: "Meal timings are required" })
    .array()
    .min(1, { message: "Select at least 1 meal time" }),
  minCaloriesPerDay: z
    .string({ required_error: "Min calories is required" })
    .min(0, { message: "Calories per day is required" }),
  maxCaloriesPerDay: z
    .string({ required_error: "Max calories is required" })
    .min(0, { message: "Calories per day is required" }),
  mealCategories: z.string().array().optional(),
  // userId: z.string({ required_error: "User ID is required" }),
});

export type UserMealPlanType = z.infer<typeof userMealPlanZodSchema>;

export const validateNewUserMealPlanRequest = (body: UserMealPlanType) => {
  const res = userMealPlanZodSchema.parse(body);
  return res;
};
