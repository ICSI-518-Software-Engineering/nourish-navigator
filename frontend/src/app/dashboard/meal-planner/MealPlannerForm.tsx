"use client";

import CustomCheckbox from "@/components/CustomCheckbox";
import CustomInput from "@/components/CustomInput";
import CustomRadioInput from "@/components/CustomRadioInput";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  MealPlannerFormDataType,
  mealCategoriesOptions,
  mealPlanDurationOptions,
  mealPlannerFormZodSchema,
  mealsTimingsOptions,
} from "./dataAndTypes";

const MealPlannerForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MealPlannerFormDataType>({
    defaultValues: {
      noOfDays: "7",
      mealsTimings: [],
      maxCaloriesPerDay: "2000",
      minCaloriesPerDay: "1000",
      mealCategories: [],
    },
    resolver: zodResolver(mealPlannerFormZodSchema),
  });

  return (
    <Card className="p-10 max-w-xl">
      <Box
        component="form"
        onSubmit={handleSubmit((d) => console.log(d))}
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
            description="Preferred minimum calories"
            className="h-auto py-0 w-full"
          />
          {/* Max Calories */}
          <CustomInput
            id="maxCaloriesPerDay"
            register={register}
            label="Max Calories"
            errors={errors}
            type="number"
            description="Preferred maximum calories"
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
        <Button className="self-end">Submit</Button>
      </Box>
    </Card>
  );
};

export default MealPlannerForm;
