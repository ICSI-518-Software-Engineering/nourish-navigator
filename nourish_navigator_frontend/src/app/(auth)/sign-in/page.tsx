"use client";

import { useLoginService } from "@/api/auth";
import { isHttpError } from "@/api/http";
import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignInFormDataType, signInSchema } from "../dataAndTypes";

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormDataType>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: mutateLogin, isPending } = useLoginService();

  const onSubmit = (data: SignInFormDataType) => {
    mutateLogin(data, {
      onError: (e) => {
        if (isHttpError(e)) {
          setError("email", { message: e.response?.data });
        }
      },
    });
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
          <Button disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
