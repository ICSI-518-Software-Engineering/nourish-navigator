"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUserActivityRequest = exports.userActivityZodSchema = exports.MongooseUserActivitySchema = void 0;
var moment_1 = __importDefault(require("moment"));
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
var constants_1 = require("../lib/constants");
exports.MongooseUserActivitySchema = new mongoose_1.default.Schema({
    totalCalories: {
        type: Number,
        required: true,
        default: 0,
    },
    totalFat: {
        type: Number,
        required: true,
        default: 0,
    },
    totalProtein: {
        type: Number,
        required: true,
        default: 0,
    },
    currentWeight: {
        type: Number,
    },
    date: {
        type: String,
        required: true,
        default: (0, moment_1.default)(Date.now()).format(constants_1.DEFAULTS.dateFormat),
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
var UserActivity = mongoose_1.default.model("user_activitie", exports.MongooseUserActivitySchema);
exports.default = UserActivity;
exports.userActivityZodSchema = zod_1.z.object({
    totalCalories: zod_1.z
        .number({ required_error: "Total Calories is required" })
        .min(0, { message: "Total Calories must be greater than 0" }),
    totalFat: zod_1.z
        .number({ required_error: "Total Fat is required" })
        .min(0, { message: "Total Fat must be greater than 0" }),
    totalProtein: zod_1.z
        .number({ required_error: "Total Protein is required" })
        .min(0, { message: "Total Protein must be greater than 0" }),
    date: zod_1.z.union([zod_1.z.string(), zod_1.z.date()], { required_error: "Date is required" }),
    userId: zod_1.z.string({ required_error: "User ID is required" }),
    currentWeight: zod_1.z
        .number()
        .min(3, { message: "Weight must be greater than 3 kgs." })
        .optional(),
});
var validateNewUserActivityRequest = function (body) {
    var res = exports.userActivityZodSchema.parse(body);
    return res;
};
exports.validateNewUserActivityRequest = validateNewUserActivityRequest;