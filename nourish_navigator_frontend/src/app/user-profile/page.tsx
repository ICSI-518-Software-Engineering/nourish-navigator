"use client";

import { useUpdateUserProfileService } from "@/api/profile";
import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { getLoggedInUserDetails } from "../(auth)/utils";
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
    defaultValues: {
      medicalHistory: [],
      cuisinePreferences: [],
      allergies: [],
    },
  });

  const { mutate, isPending } = useUpdateUserProfileService();

  const onSubmit = (data: UserProfileFormDataType) => {
    const userDetails = getLoggedInUserDetails();
    if (!userDetails) return;

    mutate({ ...data, userId: userDetails._id });
  };

  return (
    <AuthLayout
      headerText="Setup your user profile"
      disableAutoRedirect
      className="sm:w-full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-4 grid-cols-2 gap-x-5">
          {/* Age */}
          <CustomInput
            id="age"
            errors={errors}
            label="Age"
            register={register}
            description="Used in customising meal plan"
            type="number"
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
            description="Height in foot"
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
            options={[
              {
                label: "Veg",
                value: "veg",
              },
              {
                label: "Non Veg",
                value: "non_veg",
              },
            ]}
            description="Veg or Non-veg"
          />

          {/* Cusine Preferences */}
          <MultiSelect
            id="cuisinePreferences"
            errors={errors}
            label="Cuisine Preferences"
            control={control}
            options={[
              {
                label: "American",
                value: "american",
              },
              {
                label: "Indian",
                value: "indian",
              },
            ]}
            description="To customise meal plan based on selected cuisines"
          />

          {/* Medical History */}
          <MultiSelect
            id="medicalHistory"
            errors={errors}
            label="Medical History"
            control={control}
            options={[
              {
                value: "diabetes",
                label: "Diabetes",
              },
              {
                value: "heart-attack",
                label: "Heart Attack",
              },
              {
                value: "asthma",
                label: "Asthma",
              },
              {
                value: "anxiety",
                label: "Anxiety",
              },
              {
                value: "thyroid",
                label: "Thyroid",
              },
            ]}
            description="To customise meal plan based on medical health"
          />

          {/* Allergies */}
          <MultiSelect
            id="allergies"
            errors={errors}
            label="Allergies"
            control={control}
            options={[
              {
                label: "Dairy",
                value: "dairy",
              },
              {
                label: "Nuts",
                value: "nuts",
              },
              {
                label: "Fish",
                value: "fish",
              },
              {
                label: "Soy",
                value: "soy",
              },
            ]}
            description="To customise meal plan based on food allergies"
          />
        </div>
        {/* Save Button */}
        <Button disabled={isPending} className="self-end w-1/6">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </AuthLayout>
  );
};

export default UserProfilePage;
