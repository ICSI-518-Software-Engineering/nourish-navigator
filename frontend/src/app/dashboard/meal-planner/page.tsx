"use client";

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ActiveMealPlan from "./ActiveMealPlan";
import NoActiveMealPlan from "./NoActiveMealPlan";

const MealPlannerPage: React.FC = () => {
  return (
    <Stack gap="1rem">
      {/* Title Text */}
      <Typography variant="h4" fontWeight="bold">
        Current Meal Plan
      </Typography>

      {/* No Active Meal Plan Display */}
      <NoActiveMealPlan />

      {/* Active Meal Plan Display */}
      <Box overflow="auto">
        <ActiveMealPlan />
      </Box>
    </Stack>
  );
};

export default MealPlannerPage;
