"use client";

import CustomCheckbox from "@/components/CustomCheckbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  MealPlannerFormDataType,
  mealPlannerFormZodSchema,
  mealsTimingsOptions,
} from "./dataAndTypes";

const MealPlannerForm: React.FC = () => {
  const { control, handleSubmit } = useForm<MealPlannerFormDataType>({
    defaultValues: {
      noOfDays: 7,
      mealsTimings: [],
      maxCaloriesPerDay: 2000,
      minCaloriesPerDay: 1000,
    },
    resolver: zodResolver(mealPlannerFormZodSchema),
  });

  return (
    <Card className="p-16">
      <Box
        component="form"
        onSubmit={handleSubmit((d) => console.log(d))}
        className="flex flex-col gap-5"
      >
        <CustomCheckbox
          label="Preferred Meal Timings"
          description="To generate meal plan based on the timings"
          id="mealsTimings"
          control={control}
          options={mealsTimingsOptions}
        />
        <Button className="self-end">Submit</Button>
      </Box>
    </Card>
  );
};

export default MealPlannerForm;
