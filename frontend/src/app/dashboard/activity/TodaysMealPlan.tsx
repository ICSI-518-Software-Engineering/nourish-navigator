"use client";

import { useUpdateUserActivityService } from "@/api/activity";
import { useGetUserProfileService } from "@/api/profile";
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DEFAULTS } from "@/lib/constants";
import { Stack, Tooltip, Typography } from "@mui/material";
import { CheckCircleIcon, ListRestartIcon } from "lucide-react";
import moment from "moment";
import React, { useMemo } from "react";
import {
  MealPlanRecordType,
  breakfastIcon,
  dinnerIcon,
  lunchIcon,
} from "../meal-planner/dataAndTypes";

const TodaysMealPlan: React.FC = () => {
  const { data: userProfile, isLoading } = useGetUserProfileService();

  const todaysMealPlan = useMemo(() => {
    if (!userProfile) return undefined;

    return userProfile.mealPlan.find((item) =>
      moment().isSame(moment(item.date, DEFAULTS.dateFormat), "day")
    );
  }, [userProfile]);

  return (
    <Stack gap="1rem">
      <Typography variant="h6">Meal plan</Typography>
      <TodaysMealPlanBase
        isLoading={isLoading}
        todaysMealPlan={todaysMealPlan}
      />
    </Stack>
  );
};

export default TodaysMealPlan;

/**
 * ============== BASE COMPONENTS ====================
 */
type TodaysMealPlanBaseProps = {
  todaysMealPlan?: MealPlanRecordType;
  isLoading?: boolean;
};
const TodaysMealPlanBase: React.FC<TodaysMealPlanBaseProps> = ({
  todaysMealPlan,
  isLoading,
}) => {
  const { mutate: updateUserActivity, isPending } =
    useUpdateUserActivityService();

  const loggedInUser = getLoggedInUserDetails();

  if (!loggedInUser) return null;

  if (isLoading) {
    return (
      <Card className="h-72 flex items-center justify-center">
        <Stack alignItems="center" justifyContent="center">
          <LoadingSpinner isVisible className="size-24" />
          <Typography>Fetching todays meal plan...</Typography>
        </Stack>
      </Card>
    );
  }

  if (!todaysMealPlan) {
    return (
      <Card className="h-72 flex items-center justify-center">
        <Typography>
          There&apos;s no meal plan for today. Please create a new one
        </Typography>
      </Card>
    );
  }

  const recipeCards = [
    {
      key: "breakfast",
      icon: breakfastIcon,
      recipeItem: todaysMealPlan.breakfast,
    },
    {
      key: "lunch",
      icon: lunchIcon,
      recipeItem: todaysMealPlan.lunch,
    },
    {
      key: "dinner",
      icon: dinnerIcon,
      recipeItem: todaysMealPlan.dinner,
    },
  ];

  return (
    <Stack direction="row" gap="1rem" overflow="auto">
      {recipeCards.map((card) => (
        <RecipeCard
          key={card.key}
          icon={card.icon}
          recipeItem={card.recipeItem}
          actions={
            // Consumed & Swap Button
            <Stack direction="row" gap="0.5rem">
              {/* Consumed Button */}
              <Tooltip title="Update comsumption status" arrow>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const numberOfServings = window.prompt(
                      "Number of servings consumed",
                      card.recipeItem?.noOfServingsConsumed?.toString?.()
                    );
                    if (numberOfServings) {
                      updateUserActivity({
                        mealTime: card.key,
                        consumption: numberOfServings ?? "0",
                        userId: loggedInUser._id,
                      });
                    }
                  }}
                >
                  <CheckCircleIcon size="1.25rem" />
                </Button>
              </Tooltip>

              {/* Swap Button */}
              <Tooltip title="Swap with another recipe" arrow>
                <Button size="sm" variant="outline">
                  <ListRestartIcon size="1.25rem" />
                </Button>
              </Tooltip>
            </Stack>
          }
        />
      ))}
    </Stack>
  );
};
