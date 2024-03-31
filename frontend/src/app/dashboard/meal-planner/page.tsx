"use client";

import { useGetUserProfileService } from "@/api/profile";
import CustomDialog from "@/components/CustomDialog";
import LoadingSkeletion from "@/components/LoadingSkeletion";
import { Button } from "@/components/ui/button";
import { DEFAULTS } from "@/lib/constants";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Edit2 } from "lucide-react";
import React, { useState } from "react";
import ActiveMealPlan from "./ActiveMealPlan";
import MealPlannerForm from "./MealPlannerForm";
import NoActiveMealPlan from "./NoActiveMealPlan";

const MealPlannerPage: React.FC = () => {
  const { isLoading, data: userData } = useGetUserProfileService();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingSkeletion className="h-[80vh]" />;
  }

  const hasMealPlan = userData?.mealPlan && userData?.mealPlanProfile;

  return (
    <Stack gap="1rem">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Title Text */}
        <Typography variant="h4" fontWeight="bold">
          Current Meal Plan
        </Typography>

        {/* Update Meal Plan Dialog */}
        {hasMealPlan && (
          <CustomDialog
            dialogTrigger={
              <Button
                className="border-gold-600 border"
                onClick={() => setIsOpen(true)}
              >
                <Edit2 size="1rem" className="mr-2" /> Edit Meal Plan
              </Button>
            }
            dialogTitle="Edit Meal Plan"
          >
            <Divider color={DEFAULTS.textColor} />
            <MealPlannerForm notAsCard />
          </CustomDialog>
        )}
      </Stack>

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
