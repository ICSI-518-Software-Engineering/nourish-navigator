import moment from "moment";
import mongoose from "mongoose";
import { z } from "zod";
import { DEFAULTS } from "../lib/constants";

export const MongooseUserActivitySchema = new mongoose.Schema<UserActivityType>(
  {
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
      type: String,
      required: true,
      default: moment().format(DEFAULTS.dateFormat),
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserActivity = mongoose.model(
  "user_activitie",
  MongooseUserActivitySchema
);
export default UserActivity;

export const userActivityZodSchema = z.object({
  totalCalories: z
    .number({ required_error: "Total Calories is required" })
    .min(0, { message: "Total Calories must be greater than 0" }),
  totalFat: z
    .number({ required_error: "Total Fat is required" })
    .min(0, { message: "Total Fat must be greater than 0" }),
  totalProtien: z
    .number({ required_error: "Total Protien is required" })
    .min(0, { message: "Total Protien must be greater than 0" }),
  date: z.union([z.string(), z.date()], { required_error: "Date is required" }),
  userId: z.string({ required_error: "User ID is required" }),
});

export type UserActivityType = z.infer<typeof userActivityZodSchema>;

export const validateNewUserActivityRequest = (body: UserActivityType) => {
  const res = userActivityZodSchema.parse(body);
  return res;
};