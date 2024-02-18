"use client";

import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { signInFormDataType, signInSchema } from "../dataAndTypes";

const isLoading = false;

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormDataType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = () => {
    // signIn({ email, password })
  };

  return (
    <AuthLayout
      headerText="Sign in to your account"
      redirectionLinkText="Don't have an account?"
      redirectionLinkUrl="/sign-up"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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

          {/* Sign In Button */}
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
