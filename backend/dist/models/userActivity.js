"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewUserActivityRequest = exports.userActivityZodSchema = exports.MongooseUserActivitySchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
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
    totalProtien: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    history: [JSON],
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
    totalProtien: zod_1.z
        .number({ required_error: "Total Protien is required" })
        .min(0, { message: "Total Protien must be greater than 0" }),
    date: zod_1.z.union([zod_1.z.string(), zod_1.z.date()], { required_error: "Date is required" }),
    history: zod_1.z.array(zod_1.z.any()).optional(),
});
var validateNewUserActivityRequest = function (body) {
    var res = exports.userActivityZodSchema.parse(body);
    return res;
};
exports.validateNewUserActivityRequest = validateNewUserActivityRequest;
