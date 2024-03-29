"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNutritionZodSchema = exports.MongooseUserNutritionSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
exports.MongooseUserNutritionSchema = new mongoose_1.default.Schema({
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
exports.userNutritionZodSchema = zod_1.z.object({
    calorieTarget: zod_1.z.string().optional(),
    proteinTarget: zod_1.z.string().optional(),
    fatTarget: zod_1.z.string().optional(),
    carbTarget: zod_1.z.string().optional(),
});
// Custom Validator
//export const validateNewUserProfileRequest = (
//  body: UserNutritionRequestDataType
//) => {
//  const res = userNutritionZodSchema.parse(body);
// return res;
//};
