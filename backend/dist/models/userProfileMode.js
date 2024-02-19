"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUserProfileRequest = exports.userProfileSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
var UserProfileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});
exports.userProfileSchema = zod_1.z.object({
    age: zod_1.z.number({ required_error: "Age is required" }),
    gender: zod_1.z.string({ required_error: "Gender is required" }),
    height: zod_1.z.number({ required_error: "Height is required" }),
    weight: zod_1.z.number({ required_error: "Weight is required" }),
    dietaryPreference: zod_1.z.string().optional(),
    cuisinePreferences: zod_1.z.string().array().optional(),
    medicalHistory: zod_1.z.string().array().optional(),
    allergies: zod_1.z.string().array().optional(),
});
// Custom Validator
var validateNewUserProfileRequest = function (body) {
    var res = exports.userProfileSchema.parse(body);
    return res;
};
exports.validateNewUserProfileRequest = validateNewUserProfileRequest;
var UserProfile = mongoose_1.default.model("user_profile", UserProfileSchema);
exports.default = UserProfile;
