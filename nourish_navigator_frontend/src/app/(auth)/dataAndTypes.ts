import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = signInSchema
  .extend({
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((items) => items.password === items.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signInFormDataType = z.infer<typeof signInSchema>;
export type signUpFormDataType = z.infer<typeof signUpSchema>;