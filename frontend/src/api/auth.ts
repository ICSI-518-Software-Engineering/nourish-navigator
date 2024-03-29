import {
  SignInFormDataType,
  SignUpFormDataType,
} from "@/app/(auth)/dataAndTypes";
import { useMutation } from "@tanstack/react-query";
import http from "./http";

/**
 * Sign In Service
 */

const loginService = async (data: SignInFormDataType) => {
  const res = await http.post<string>("/auth/sign-in", data);
  return res.data;
};

export const useLoginService = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

/**
 * Sign Up Service
 */
const signUpService = async (data: SignUpFormDataType) => {
  const res = await http.post<string>("/auth/sign-up", data);
  return res.data;
};

export const useSignUpService = () => {
  return useMutation({
    mutationFn: signUpService,
  });
};
