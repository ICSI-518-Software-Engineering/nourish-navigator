"use client";

import { useGetUserProfileService } from "@/api/profile";
import { DEFAULTS } from "@/lib/constants";
import { Stack, Typography } from "@mui/material";
import React from "react";
import MealPlannerForm from "./MealPlannerForm";

const MealPlannerPage: React.FC = () => {
  const { data: userProfile } = useGetUserProfileService();
  const mealPlan = userProfile?.mealPlan;

  return (
    <Stack gap="1rem">
      {/* Title Text */}
      <Typography variant="h4" fontWeight="bold">
        Current Meal Plan
      </Typography>
      <Typography color={DEFAULTS.textColor}>
        You have no active meal plan. Create one by filling the form below.
      </Typography>
      <MealPlannerForm />

      {/* Meal Planner Cards */}
      {/* 
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </CardContent>
        </Card> */}
    </Stack>
  );
};

export default MealPlannerPage;
