import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { CallbackError } from "mongoose";
import { z } from "zod";

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function (next) {
  const thisObj = this as SignUpSchema;

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

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
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

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const signUpSchema = signInSchema.extend({
  name: z.string({ required_error: "Name is required" }),
  isAdmin: z.boolean().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;

// Custom Validator
export const validateSignUpRequest = (body: SignUpSchema) => {
  const res = signUpSchema.parse(body);
  return res;
};

export const validateSignInRequest = (body: SignInSchema) => {
  const res = signInSchema.parse(body);
  return res;
};

type UserModel = {
  generateAuthToken: () => string;
  validatePassword: (password: string) => boolean;
} & SignUpSchema;

const User = mongoose.model<UserModel>("user", userSchema);
export default User;
