"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUserMealPlanRequest = exports.userMealPlanZodSchema = exports.MongooseUserMealPlanSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
exports.MongooseUserMealPlanSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
// const MealPlan = mongoose.model("mealplan", MongooseUserMealPlanSchema);
// export default MealPlan;
exports.userMealPlanZodSchema = zod_1.z.object({
    noOfDays: zod_1.z
        .string({ required_error: "Meal plan duration is required" })
        .min(1, { message: "Meal plan duration is required" }),
    mealsTimings: zod_1.z
        .string({ required_error: "Meal timings are required" })
        .array()
        .min(1, { message: "Select at least 1 meal time" }),
    minCaloriesPerDay: zod_1.z
        .string({ required_error: "Min calories is required" })
        .min(0, { message: "Calories per day is required" }),
    maxCaloriesPerDay: zod_1.z
        .string({ required_error: "Max calories is required" })
        .min(0, { message: "Calories per day is required" }),
    mealCategories: zod_1.z.string().array().optional(),
    // userId: z.string({ required_error: "User ID is required" }),
});
var validateNewUserMealPlanRequest = function (body) {
    var res = exports.userMealPlanZodSchema.parse(body);
    return res;
};
exports.validateNewUserMealPlanRequest = validateNewUserMealPlanRequest;
