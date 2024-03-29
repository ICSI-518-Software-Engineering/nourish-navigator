"use client";

import {
  useGetUserProfileService,
  useUpdateUserProfileService,
} from "@/api/profile";
import AuthLayout from "@/components/AuthLayout";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getLoggedInUserDetails } from "../../(auth)/utils";
import { UserProfileFormDataType, userProfileSchema } from "../dataAndTypes";

type UserProfilePageProps = {
  params: {
    mode?: ["edit" | "setup" | ""];
  };
};

const UserProfilePage: React.FC<UserProfilePageProps> = ({ params }) => {
  const mode = params.mode;

  const settings = useGetDefaultValues(mode);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserProfileFormDataType>({
    ...(settings?.btnLabel !== "Edit" && {
      resolver: zodResolver(userProfileSchema),
    }),
    defaultValues: settings?.formData ?? defaultData,
  });

  useEffect(() => {
    if (settings?.formData) {
      reset(settings?.formData);
    }
  }, [reset, settings?.formData]);

  useEffect(() => {
    if (mode?.[0] === "setup" && settings?.apiData) {
      return router.replace("/");
    }
  }, [mode, router, settings?.apiData]);

  const { mutate, isPending } = useUpdateUserProfileService();

  const onSubmit = (data: UserProfileFormDataType) => {
    if (settings?.btnLabel === "Edit") {
      return router.push("/user-profile/edit");
    }
    const userDetails = getLoggedInUserDetails();
    if (!userDetails) return;

    mutate(
      { ...data, userId: userDetails._id },
      {
        onSuccess: (e) => {
          toast.success(e);
          return router.push("/user-profile");
        },
      }
    );
  };

  return (
    <AuthLayout
      headerText={settings.title}
      disableAutoRedirect
      className="sm:w-full"
      isLoading={
        settings?.isLoading ||
        Boolean(mode?.[0] === "setup" && settings?.apiData)
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div
          className={cn("grid gap-4 grid-cols-2 gap-x-5", {
            "select-none pointer-events-none": !settings?.isClickable,
          })}
        >
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
          {settings?.btnLabel}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default UserProfilePage;

// ================
const defaultData = {
  medicalHistory: [],
  cuisinePreferences: [],
  allergies: [],
  dietaryPreference: "",
  gender: "",
};

const useGetDefaultValues = (mode: UserProfilePageProps["params"]["mode"]) => {
  const isEditMode = mode?.[0] === "edit";
  const isSetupMode = mode?.[0] === "setup";
  const isViewMode = !mode;

  const { data, isPending } = useGetUserProfileService();

  const userProfileData = data?.userProfile;

  const user = getLoggedInUserDetails();
  if (!user || isSetupMode) {
    return {
      formData: defaultData,
      isClickable: true,
      isLoading: isPending,
      btnLabel: "Save",
      title: "Setup your profile",
      apiData: userProfileData,
    };
  }

  if (isViewMode) {
    return {
      formData: userProfileData,
      isClickable: false,
      isLoading: isPending,
      btnLabel: "Edit",
      title: "Current profile",
      apiData: userProfileData,
    };
  }

  if (isEditMode) {
    return {
      formData: userProfileData,
      isClickable: true,
      isLoading: isPending,
      btnLabel: "Update",
      title: "Update your profile",
      apiData: userProfileData,
    };
  }

  return {
    formData: defaultData,
    isClickable: true,
    isLoading: isPending,
    btnLabel: "Save",
    title: "Setup your profile",
    apiData: userProfileData,
  };
};
