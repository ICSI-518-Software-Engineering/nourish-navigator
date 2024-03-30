import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { CallbackError } from "mongoose";
import { z } from "zod";
import {
  MongooseUserMealPlanSchema,
  UserMealPlanType,
} from "./userMealPlanModel";
import {
  MongooseUserProfileSchema,
  UserProfileRequestDataType,
} from "./userProfileModel";
import { MongooseUserMealSelectionSchema, UserMealSelectionDataType } from "./userDailyMealPlanModel";
import { MongooseUserNutritionSchema, UserNutritionRequestDataType } from "./userNutritionModel";

export const MongooseUserSchema = new mongoose.Schema({
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
  userProfile: MongooseUserProfileSchema,
  mealPlanProfile: MongooseUserMealPlanSchema,
  mealPlan: [MongooseUserMealSelectionSchema],
  userNutrition: MongooseUserNutritionSchema
});

MongooseUserSchema.pre("save", async function (next) {
  const thisObj = this as SignUpRequestDataType;

  if (!this.isModified("password")) {
    return next();
  }

  try {
    thisObj.password = await bcrypt.hash(thisObj.password, 10);
    return next();
  } catch (e) {
    return next(e as CallbackError);
  }
});

MongooseUserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

MongooseUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_PRIVATE_KEY as string
  );
  return token;
};

export const signInZodSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const signUpZodSchema = signInZodSchema.extend({
  name: z.string({ required_error: "Name is required" }),
  isAdmin: z.boolean().optional(),
});

export type SignUpRequestDataType = z.infer<typeof signUpZodSchema>;
export type SignInRequestDataType = z.infer<typeof signInZodSchema>;

// Custom Validator
export const validateSignUpRequest = (body: SignUpRequestDataType) => {
  const res = signUpZodSchema.parse(body);
  return res;
};

export const validateSignInRequest = (body: SignInRequestDataType) => {
  const res = signInZodSchema.parse(body);
  return res;
};

type UserModelType = {
  generateAuthToken: () => string;
  validatePassword: (password: string) => boolean;
} & SignUpRequestDataType;

export type UserProfileUpdateRequestBodyType = {
  userProfile: UserProfileRequestDataType;
  mealPlanProfile: UserMealPlanType;
  mealPlan: Record<string, unknown>[];
  userNutrition: UserNutritionRequestDataType
};

const User = mongoose.model<UserModelType & UserProfileUpdateRequestBodyType & UserNutritionRequestDataType & [UserMealSelectionDataType]>(
  "user",
  MongooseUserSchema
);

export default User;

/**
 * ============ USER OBJECT TYPE ===============
 */

export type UserObjectType = SignUpRequestDataType &
  UserProfileUpdateRequestBodyType;
