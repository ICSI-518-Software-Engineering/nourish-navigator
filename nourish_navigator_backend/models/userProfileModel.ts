import mongoose from "mongoose";
import { z } from "zod";

export const MongooseUserProfileSchema = new mongoose.Schema({
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
    type: [String],
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

export const userProfileZodSchema = z.object({
  age: z.string({ required_error: "Age is required" }),
  gender: z.string({ required_error: "Gender is required" }),
  height: z.string({ required_error: "Height is required" }),
  weight: z.string({ required_error: "Weight is required" }),
  dietaryPreference: z.string().optional(),
  cuisinePreferences: z.string().array().optional(),
  medicalHistory: z.string().array().optional(),
  allergies: z.string().array().optional(),
});

export type UserProfileRequestDataType = z.infer<typeof userProfileZodSchema>;

// Custom Validator
export const validateNewUserProfileRequest = (
  body: UserProfileRequestDataType
) => {
  const res = userProfileZodSchema.parse(body);
  return res;
};

// const UserProfile = mongoose.model<UserProfileRequestDataType>(
//   "user_profile",
//   MongooseUserProfileSchema
// );
// export default UserProfile;
