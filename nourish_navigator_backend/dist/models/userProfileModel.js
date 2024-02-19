"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUserProfileRequest = exports.userProfileZodSchema = exports.MongooseUserProfileSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
exports.MongooseUserProfileSchema = new mongoose_1.default.Schema({
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    dietaryPreference: {
        type: String,
    },
    cuisinePreferences: {
        type: [String],
    },
    medicalHistory: {
        type: [String],
    },
    allergies: {
        type: [String],
    },
});
exports.userProfileZodSchema = zod_1.z.object({
    age: zod_1.z.string({ required_error: "Age is required" }),
    gender: zod_1.z.string({ required_error: "Gender is required" }),
    height: zod_1.z.string({ required_error: "Height is required" }),
    weight: zod_1.z.string({ required_error: "Weight is required" }),
    dietaryPreference: zod_1.z.string().optional(),
    cuisinePreferences: zod_1.z.string().array().optional(),
    medicalHistory: zod_1.z.string().array().optional(),
    allergies: zod_1.z.string().array().optional(),
});
// Custom Validator
var validateNewUserProfileRequest = function (body) {
    var res = exports.userProfileZodSchema.parse(body);
    return res;
};
exports.validateNewUserProfileRequest = validateNewUserProfileRequest;
// const UserProfile = mongoose.model<UserProfileRequestDataType>(
//   "user_profile",
//   MongooseUserProfileSchema
// );
// export default UserProfile;
