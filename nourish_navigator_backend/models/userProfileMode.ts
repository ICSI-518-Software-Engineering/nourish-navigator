import mongoose from "mongoose";
import { z } from "zod";

const UserProfileSchema = new mongoose.Schema({
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

export const userProfileSchema = z.object({
  age: z.number({ required_error: "Age is required" }),
  gender: z.string({ required_error: "Gender is required" }),
  height: z.number({ required_error: "Height is required" }),
  weight: z.number({ required_error: "Weight is required" }),
  dietaryPreference: z.string().optional(),
  cuisinePreferences: z.string().array().optional(),
  medicalHistory: z.string().array().optional(),
  allergies: z.string().array().optional(),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

// Custom Validator
export const validateNewUserProfileRequest = (body: UserProfileSchema) => {
  const res = userProfileSchema.parse(body);
  return res;
};

const UserProfile = mongoose.model<UserProfileSchema>(
  "user_profile",
  UserProfileSchema
);
export default UserProfile;
