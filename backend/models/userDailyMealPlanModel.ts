import mongoose from "mongoose";
import { z } from "zod";

export const MongooseUserMealPlanSchema = new mongoose.Schema({
    date: {
        type: String
    },
    meal:[{
        mealName: {
            type: String
        },
        calories: {
            type: String
        },
        image: {
            type: String
        },
        instructions: {
            type: String
        },
        protein: {
            type: String
        },
        fat: {
            type: String
        },
        carbs: {
            type: String
        }
    }]
  });

const mealZodSchema = z.object({
    mealName: z.string(),
    calories: z.string(),
    image: z.string(),
    instruction: z.string(),
    protein: z.string(),
    fat: z.string(),
    carbs: z.string()
})

export const userMealPlanZodSchema = z.object({
    date: z.string(),
    meal: mealZodSchema.array()
});

export type UserMealPlanDataType = z.infer<typeof userMealPlanZodSchema>;


