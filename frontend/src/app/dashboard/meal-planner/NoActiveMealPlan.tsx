"use client";

import { useGetUserProfileService } from "@/api/profile";
import { DEFAULTS } from "@/lib/constants";
import { Typography } from "@mui/material";
import React from "react";
import MealPlannerForm from "./MealPlannerForm";

const NoActiveMealPlan: React.FC = () => {
  const { data: userProfile } = useGetUserProfileService();
  const mealPlanProfile = userProfile?.mealPlanProfile;
  const mealPlan = userProfile?.mealPlan;

  if (mealPlanProfile && mealPlan) {
    return null;
  }

  return (
    <>
      <Typography color={DEFAULTS.textColor}>
        You have no active meal plan. Create one by filling the form below.
      </Typography>
      <MealPlannerForm />
    </>
  );
};

export default NoActiveMealPlan;
