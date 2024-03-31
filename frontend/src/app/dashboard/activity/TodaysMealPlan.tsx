"use client";

import { useUpdateUserActivityService } from "@/api/activity";
import { useGetUserProfileService } from "@/api/profile";
import { useRecipeSearchService } from "@/api/recipe";
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import CustomDialog from "@/components/CustomDialog";
import LoadingOverlay from "@/components/LoadingOverlay";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DEFAULTS } from "@/lib/constants";
import {
  Box,
  Divider,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CheckCircleIcon, CheckIcon, ListRestartIcon } from "lucide-react";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  MealPlanRecordType,
  breakfastIcon,
  dinnerIcon,
  lunchIcon,
} from "../meal-planner/dataAndTypes";
import RecipeSearchForm from "../recipes/RecipeSearchForm";

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
  const [isSwapRecipeDialogOpen, setIsSwapRecipeDialogOpen] =
    useState<boolean>(false);
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  const { mutate: updateUserActivity, isPending: isUpdatingUserActivity } =
    useUpdateUserActivityService();

  const {
    data: recipes,
    mutate: searchForRecipes,
    isPending: isSearchingForRecipes,
  } = useRecipeSearchService();

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
    <>
      <Stack direction="row" gap="1rem" overflow="auto">
        {recipeCards.map((card) => {
          const disableSwapBtn =
            (card?.recipeItem?.noOfServingsConsumed ?? 0) > 0;

          return (
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
                        if (Number(numberOfServings) < 0)
                          return window.alert(
                            "Portion sizes must be non negative."
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
                  <CustomDialog
                    isOpen={isSwapRecipeDialogOpen}
                    setIsOpen={setIsSwapRecipeDialogOpen}
                    dialogTrigger={
                      <Tooltip
                        title={
                          disableSwapBtn
                            ? "Please make sure that the consumption portions are 0 before trying to swap with new recipe item"
                            : "Swap with another recipe"
                        }
                        arrow
                      >
                        <Box
                          {...(disableSwapBtn
                            ? {
                                onClick: (e: React.MouseEvent) =>
                                  e.preventDefault(),
                              }
                            : {})}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={disableSwapBtn}
                            onClick={() => setIsSwapRecipeDialogOpen(true)}
                          >
                            <ListRestartIcon size="1.25rem" />
                          </Button>
                        </Box>
                      </Tooltip>
                    }
                    className="lg:max-w-[80vw] lg:max-h-[70vh] overflow-auto h-screen lg:overflow-hidden lg:h-auto"
                    dialogTitle={
                      "Swap Recipe in place of " + card.recipeItem?.label ?? ""
                    }
                  >
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      gap="2rem"
                      height="100%"
                      mt="0.5rem"
                    >
                      {/* Recipe Search Form */}
                      <Box minWidth="40%">
                        <RecipeSearchForm
                          notAsCard
                          onSubmit={(d) => searchForRecipes(d)}
                          isLoading={isSearchingForRecipes}
                        />
                      </Box>

                      {/* Divider */}

                      <Divider
                        orientation={isLargeScreen ? "vertical" : "horizontal"}
                      />

                      {/* Recipe Search Results */}
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        flexGrow={1}
                        gap="2rem"
                        overflow={{ xs: "initial", lg: "auto" }}
                        maxHeight={{ xs: undefined, lg: "60vh" }}
                        width={{ xs: "100%", lg: "auto" }}
                      >
                        {/* Start search for recipes */}
                        {!recipes && (
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                          >
                            <Typography className="text-muted-foreground">
                              Start search for a recipes
                            </Typography>
                          </Stack>
                        )}

                        {/* No Recipes Found */}
                        {recipes && recipes.length === 0 && (
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                          >
                            <Typography className="text-muted-foreground">
                              No recipes found. please search again.
                            </Typography>
                          </Stack>
                        )}

                        {recipes?.map?.((r, idx) => (
                          <RecipeCard
                            key={r.url + idx.toString()}
                            recipeItem={r}
                            actions={
                              <Tooltip arrow title="Swap with this recipe">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to swap the current recipe with this recipe?"
                                      )
                                    ) {
                                      updateUserActivity(
                                        {
                                          mealTime: card.key,
                                          consumption: "0",
                                          userId: loggedInUser._id,
                                          recipe: r,
                                        },
                                        {
                                          onSuccess: () => {
                                            toast.success(
                                              "Recipe swapped successfully."
                                            );
                                            setIsSwapRecipeDialogOpen(false);
                                          },
                                        }
                                      );
                                    }
                                  }}
                                >
                                  <CheckIcon />
                                </Button>
                              </Tooltip>
                            }
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </CustomDialog>
                </Stack>
              }
            />
          );
        })}
      </Stack>

      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isUpdatingUserActivity}
        loadingLabel="Please Wait..."
      />
    </>
  );
};