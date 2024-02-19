"use client";

import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
// import { Icons } from '@/components/Icons'
import { useSignUpService } from "@/api/auth";
import { isHttpError } from "@/api/http";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignUpFormDataType, signUpSchema } from "../../dataAndTypes";
import { loginUser } from "../../utils";

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormDataType>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: mutateSignUp, isPending } = useSignUpService();

  const onSubmit = (data: SignUpFormDataType) => {
    mutateSignUp(
      { ...data, isAdmin: true },
      {
        onSuccess: (token) => loginUser(token, "/user-profile/setup"),
        onError: (e) => {
          if (isHttpError(e)) {
            setError("email", { message: e.response?.data });
          }
        },
      }
    );
  };

  return (
    <AuthLayout
      headerText="Sign up your account"
      redirectionLinkText="Already have an account?"
      redirectionLinkUrl="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <CustomInput
            id="name"
            errors={errors}
            label="Name"
            register={register}
          />

          <CustomInput
            id="email"
            errors={errors}
            label="Email"
            register={register}
            placeholder="you@email.com"
          />

          <CustomInput
            id="password"
            errors={errors}
            label="Password"
            register={register}
            type="password"
          />

          <CustomInput
            id="confirmPassword"
            errors={errors}
            label="Confirm Password"
            register={register}
            type="password"
          />

          {/* Sign Up Button */}
          <Button disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
