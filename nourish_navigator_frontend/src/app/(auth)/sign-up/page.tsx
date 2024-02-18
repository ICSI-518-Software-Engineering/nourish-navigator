"use client";

import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
// import { Icons } from '@/components/Icons'
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

// import { toast } from 'sonner'

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; confirmPassword: string }>({
    // resolver: zodResolver(),
  });

  const onSubmit = () => {
    // signIn({ email, password })
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

          {/* Sign In Button */}
          <Button>
            {/* {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )} */}
            Sign up
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
