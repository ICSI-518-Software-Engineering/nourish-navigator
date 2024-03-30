"use client";

import { useGetUserProfileService } from "@/api/profile";
import { DEFAULTS } from "@/lib/constants";
import { Box, Stack, Typography } from "@mui/material";
import React, { useId } from "react";
import MealPlanDisplay from "./MealPlanDisplay";

const ActiveMealPlan: React.FC = () => {
  const id = useId();
  const { data: userProfile } = useGetUserProfileService();
  const mealPlanProfile = userProfile?.mealPlanProfile;
  const mealPlan = userProfile?.mealPlan;

  if (!mealPlan || !mealPlanProfile) {
    return null;
  }

  return (
    <Stack overflow="hidden" gap="1rem">
      <Typography color={DEFAULTS.textColor}>
        Here is your current meal plan
      </Typography>

      <Box
        display="flex"
        gap="1rem"
        alignItems="start"
        overflow="auto"
        className="hide-scrollbar"
        height="calc(100vh - 12.5rem)"
      >
        {mealPlan.map((item, index) => (
          <MealPlanDisplay key={id + index} mealPlanItem={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default ActiveMealPlan;
