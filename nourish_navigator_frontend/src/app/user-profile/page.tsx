"use client";

import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
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

  const onSubmit = (data: UserProfileFormDataType) => {
    console.log(data);
  };

  return (
    <AuthLayout
      headerText="Setup your user profile"
      disableAutoRedirect
      className="sm:w-full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-2 grid-cols-2 gap-x-5">
          {/* Age */}
          <CustomInput
            id="age"
            errors={errors}
            label="Age"
            register={register}
            description="Used in customising meal plan"
          />

          {/* Gender */}
          <CustomSelect
            id="gender"
            errors={errors}
            control={control}
            label="Gender"
            options={[
              {
                label: "Male",
                value: "male",
              },
              {
                label: "Female",
                value: "female",
              },
            ]}
            description="Choose your gender"
          />

          {/* Height */}
          <CustomInput
            id="height"
            errors={errors}
            label="Height"
            register={register}
            description="Height in cm"
          />

          {/* Weight */}
          <CustomInput
            id="weight"
            errors={errors}
            label="Weight"
            register={register}
            description="Weight in kg"
          />

          {/* Dietary Preferences */}
          <CustomSelect
            id="dietaryPreference"
            errors={errors}
            label="Dietary Preferences"
            control={control}
            options={[]}
            description="Veg or Non Veg"
          />

          {/* Cusine Preferences */}
          <CustomSelect
            id="cuisinePreferences"
            errors={errors}
            label="Cuisine Preferences"
            control={control}
            options={[]}
            description="To customise meal plan based on selected cuisines"
          />

          {/* Medical History */}
          <CustomSelect
            id="medicalHistory"
            errors={errors}
            label="Medical History"
            control={control}
            options={[]}
            description="To customise meal plan based on medical health"
          />

          {/* Allergies */}
          <CustomSelect
            id="allergies"
            errors={errors}
            label="Allergies"
            control={control}
            options={[]}
            description="Avoid any specific ingredients"
          />
        </div>
        {/* Save Button */}
        <Button disabled={false} className="self-end w-1/6">
          {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </AuthLayout>
  );
};

export default UserProfilePage;
