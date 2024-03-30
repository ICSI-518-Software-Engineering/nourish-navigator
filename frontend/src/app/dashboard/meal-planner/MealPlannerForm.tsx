"use client";

<<<<<<< HEAD
import {
  useGetUserProfileService,
  useUpdateUserProfileService,
} from "@/api/profile";
=======
import { useUpdateUserProfileService } from "@/api/profile";
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/CustomInput";
import CustomRadioInput from "@/components/CustomRadioInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  MealPlannerFormDataType,
  mealCategoriesOptions,
  mealPlanDurationOptions,
  mealPlannerFormZodSchema,
  mealsTimingsOptions,
} from "./dataAndTypes";

<<<<<<< HEAD
type MealPlannerFormProps = {
  notAsCard?: boolean;
};

const MealPlannerForm: React.FC<MealPlannerFormProps> = ({ notAsCard }) => {
  if (notAsCard) {
    return <MealPlannerFormBase />;
  }

  return (
    <Card className="p-10 max-w-xl">
      <MealPlannerFormBase />
    </Card>
  );
};

export default MealPlannerForm;

/**
 * ================= BASE FORM ==================
 */

const MealPlannerFormBase: React.FC = () => {
  const { mutate: updateUserProfile, isPending } =
    useUpdateUserProfileService();
  const { data: userProfile } = useGetUserProfileService();
  const mealPlanProfile = userProfile?.mealPlanProfile;
=======
const MealPlannerForm: React.FC = () => {
  const { mutate: updateUserProfile, isPending } =
    useUpdateUserProfileService();
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MealPlannerFormDataType>({
<<<<<<< HEAD
    defaultValues: mealPlanProfile ?? {
=======
    defaultValues: {
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52
      noOfDays: "7",
      mealsTimings: [],
      maxCaloriesPerDay: "2000",
      minCaloriesPerDay: "1000",
      mealCategories: [],
    },
    resolver: zodResolver(mealPlannerFormZodSchema),
  });

  const onSave = useCallback(
    (data: MealPlannerFormDataType) => {
      const user = getLoggedInUserDetails();
      if (!user) return;
      updateUserProfile(
        {
          userId: user?._id,
          mealPlanProfile: data,
        },
        { onSuccess: (d) => toast.success(d) }
      );
    },
    [updateUserProfile]
  );

  return (
<<<<<<< HEAD
    <Box
      component="form"
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col gap-10"
    >
      {/* No of days */}
      <CustomRadioInput
        id="noOfDays"
        control={control}
        label="Meal Plan Duration"
        description="To generate meal plan for specified duration"
        options={mealPlanDurationOptions}
      />

      {/* Preferred Meal Timings */}
      <CustomCheckbox
        label="Preferred Meal Timings"
        description="To generate meal plan based on the timings"
        id="mealsTimings"
        control={control}
        options={mealsTimingsOptions}
      />

      {/* Calories */}
      <Box className="flex gap-3 items-start">
        {/* Min Calories */}
        <CustomInput
          id="minCaloriesPerDay"
          register={register}
          label="Min Calories"
          errors={errors}
          type="number"
          description="Minimum calories per day"
          className="h-auto py-0 w-full"
          inputProps={{ min: 1 }}
        />
        {/* Max Calories */}
        <CustomInput
          id="maxCaloriesPerDay"
          register={register}
          label="Max Calories"
          errors={errors}
          type="number"
          description="Maximum calories per day"
          className="h-auto py-0 w-full"
          inputProps={{ min: 1 }}
        />
      </Box>

      {/* Preferred Meals */}
      <MultiSelect
        id="mealCategories"
        control={control}
        options={mealCategoriesOptions}
        label="Meal Categories"
        description="To generate a meal plan based on selected meal categories"
        containerClassName="h-auto py-0"
        placeholder="Choose meal categories (Optional)"
      />
      <Button className="self-end" disabled={isPending}>
        <LoadingSpinner isVisible={isPending} /> Submit
      </Button>
    </Box>
  );
};
=======
    <Card className="p-10 max-w-xl">
      <Box
        component="form"
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col gap-10"
      >
        {/* No of days */}
        <CustomRadioInput
          id="noOfDays"
          control={control}
          label="Meal Plan Duration"
          description="To generate meal plan for specified duration"
          options={mealPlanDurationOptions}
        />

        {/* Preferred Meal Timings */}
        <CustomCheckbox
          label="Preferred Meal Timings"
          description="To generate meal plan based on the timings"
          id="mealsTimings"
          control={control}
          options={mealsTimingsOptions}
        />

        {/* Calories */}
        <Box className="flex gap-3">
          {/* Min Calories */}
          <CustomInput
            id="minCaloriesPerDay"
            register={register}
            label="Min Calories"
            errors={errors}
            type="number"
            description="Minimum calories per day"
            className="h-auto py-0 w-full"
          />
          {/* Max Calories */}
          <CustomInput
            id="maxCaloriesPerDay"
            register={register}
            label="Max Calories"
            errors={errors}
            type="number"
            description="Maximum calories per day"
            className="h-auto py-0 w-full"
          />
        </Box>

        {/* Preferred Meals */}
        <MultiSelect
          id="mealCategories"
          control={control}
          options={mealCategoriesOptions}
          label="Meal Categories"
          description="To generate a meal plan based on selected meal categories"
          containerClassName="h-auto py-0"
          placeholder="Choose meal categories (Optional)"
        />
        <Button className="self-end" disabled={isPending}>
          <LoadingSpinner isVisible={isPending} /> Submit
        </Button>
      </Box>
    </Card>
  );
};

export default MealPlannerForm;
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52
