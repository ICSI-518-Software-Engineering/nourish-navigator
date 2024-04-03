import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { CallbackError } from "mongoose";
import { z } from "zod";
import UserActivity from "./userActivity";
import {
  MongooseUserMealPlanSchema,
  UserMealPlanType,
} from "./userMealPlanModel";
import {
  MongooseUserProfileSchema,
  UserProfileRequestDataType,
} from "./userProfileModel";

export const MongooseUserSchema = new mongoose.Schema(
  {
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
    mealPlan: JSON,
    activity: {
      type: mongoose.Types.ObjectId,
      ref: UserActivity,
    },
  },
  { timestamps: true }
);

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

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const signInZodSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export const updateSignInZodSchema = signInZodSchema.extend({
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(8, { message: "Password should be atleast 8 characters" })
    .regex(passwordValidation, {
      message:
        "Password must contain atleast one lowercase letter, uppercase letter and a special character",
    }),
});

export const signUpZodSchema = signInZodSchema.extend({
  name: z.string({ required_error: "Name is required" }),
  isAdmin: z.boolean().optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be atleast 8 characters" })
    .regex(passwordValidation, {
      message:
        "Password must contain atleast one lowercase letter, uppercase letter and a special character",
    }),
});

export type SignUpRequestDataType = z.infer<typeof signUpZodSchema>;
export type SignInRequestDataType = z.infer<typeof signInZodSchema>;
export type UpdateSignInRequestDataType = z.infer<typeof updateSignInZodSchema>;

// Custom Validator
export const validateSignUpRequest = (body: SignUpRequestDataType) => {
  const res = signUpZodSchema.parse(body);
  return res;
};

export const validateSignInRequest = (body: SignInRequestDataType) => {
  const res = signInZodSchema.parse(body);
  return res;
};

export const validateUpdateSignInRequest = (
  body: UpdateSignInRequestDataType
) => {
  const res = updateSignInZodSchema.parse(body);
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
};

const User = mongoose.model<UserModelType & UserProfileUpdateRequestBodyType>(
  "user",
  MongooseUserSchema
);

export default User;

/**
 * ============ USER OBJECT TYPE ===============
 */

export type UserObjectType = SignUpRequestDataType &
  UserProfileUpdateRequestBodyType;