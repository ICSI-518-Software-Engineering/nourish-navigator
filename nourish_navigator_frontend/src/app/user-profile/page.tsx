"use client";

import AuthLayout from "@/components/AuthLayout";
import CustomSelect from "@/components/CustomSelect";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserProfileFormDataType, userProfileSchema } from "./dataAndTypes";

const UserProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<UserProfileFormDataType>({
    resolver: zodResolver(userProfileSchema),
  });

  return (
    <AuthLayout headerText="Setup your user profile">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="grid gap-2">
        {/* Date of Birth */}
        <DatePicker
          control={control}
          errors={errors}
          id="dob"
          label="Date of Birth"
        />

        {/* Gender */}
        <CustomSelect />

        {/* Save Button */}
        <Button disabled={false}>
          {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
      {/* </form> */}
    </AuthLayout>
  );
};

export default UserProfilePage;
