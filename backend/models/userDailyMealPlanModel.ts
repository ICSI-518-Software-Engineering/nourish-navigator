import mongoose from "mongoose";
import { z } from "zod";

export const MongooseAPIMealSchema = new mongoose.Schema({
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
});

export const MongooseUserMealSelectionSchema = new mongoose.Schema({
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

const APImealZodSchema = z.object({
    mealName: z.string(),
    calories: z.string(),
    image: z.string(),
    instruction: z.string(),
    protein: z.string(),
    fat: z.string(),
    carbs: z.string()
})

export const userMealSelectionZodSchema = z.object({
    date: z.string(),
    meal: APImealZodSchema.array()
});

export type UserMealSelectionDataType = z.infer<typeof userMealSelectionZodSchema>;

export type UserPreferenceMealDataType = z.infer<typeof APImealZodSchema>;


