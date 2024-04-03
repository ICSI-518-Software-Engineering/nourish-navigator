import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = signInSchema
  .extend({
    password: z
      .string()
      .min(8, { message: "Password should contain atleast 8 characters" })
      .regex(passwordValidation, {
        message:
          "Password must contain atleast one lowercase letter, uppercase letter and a special character",
      }),
    name: z.string().min(1, { message: "Name is required" }),
    isAdmin: z.boolean().optional(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((items) => items.password === items.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UserSessionDetailsType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type SignInFormDataType = z.infer<typeof signInSchema>;
export type SignUpFormDataType = z.infer<typeof signUpSchema>;