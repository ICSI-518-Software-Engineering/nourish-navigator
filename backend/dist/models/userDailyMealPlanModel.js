"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMealSelectionZodSchema = exports.MongooseUserMealSelectionSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
exports.MongooseUserMealSelectionSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
    },
    meal: [
        {
            mealName: {
                type: String,
            },
            calories: {
                type: String,
            },
            image: {
                type: String,
            },
            instructions: {
                type: String,
            },
            protein: {
                type: String,
            },
            fat: {
                type: String,
            },
            carbs: {
                type: String,
            },
        },
    ],
});
var mealZodSchema = zod_1.z.object({
    mealName: zod_1.z.string(),
    calories: zod_1.z.string(),
    image: zod_1.z.string(),
    instruction: zod_1.z.string(),
    protein: zod_1.z.string(),
    fat: zod_1.z.string(),
    carbs: zod_1.z.string(),
});
exports.userMealSelectionZodSchema = zod_1.z.object({
    date: zod_1.z.string(),
    meal: mealZodSchema.array(),
});
