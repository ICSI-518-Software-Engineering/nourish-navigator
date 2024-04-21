import { useAddNewRecipeToMealPlanService } from "@/api/activity";
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import CustomDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  MealPlanRecordItemType,
  MealPlanRecordType,
} from "../meal-planner/dataAndTypes";
import SearchRecipeDialog from "./SearchRecipeDialog";

type AddOtherFoodItemProps = {
  todaysMealPlan: MealPlanRecordType;
};

const AddOtherFoodItem: React.FC<AddOtherFoodItemProps> = ({
  todaysMealPlan,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = getLoggedInUserDetails();

  const { mutate: addNewRecipe } = useAddNewRecipeToMealPlanService();

  const handleAddRecipe = (r: MealPlanRecordItemType) => {
    const isConfirm = window.confirm(
      "Are you sure you want to add this recipe to today's meal plan?"
    );
    if (!isConfirm) return;

    addNewRecipe(
      {
        userId: user?._id,
        recipe: r,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Recipe added successfully.");
        },
      }
    );
  };

  return (
    <>
      <Card className="w-[21rem] h-[20.125rem]">
        <CardContent className="h-full">
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Button size="lg" onClick={() => setIsOpen(true)}>
              <Typography>Add other food item</Typography>
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Add Other Recipe Dialog */}
      <CustomDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogTitle="Add new food item"
        className="lg:max-w-[80vw] lg:max-h-[70vh] overflow-auto h-screen lg:overflow-hidden lg:h-auto"
      >
        <SearchRecipeDialog
          recipeCardActions={(r) => {
            const isAlreadyAddedRecipe = todaysMealPlan?.other?.findIndex
              ? todaysMealPlan?.other?.findIndex?.((i) => i.uri === r.uri) !==
                -1
              : false;
            return (
              <Tooltip
                title={
                  isAlreadyAddedRecipe
                    ? "Recipe already added. Please update consumption details as required."
                    : "Add this recipe to today's meal plan"
                }
              >
                <Box>
                  <Button
                    size="sm"
                    onClick={() => handleAddRecipe(r)}
                    disabled={isAlreadyAddedRecipe}
                  >
                    <CheckIcon />
                  </Button>
                </Box>
              </Tooltip>
            );
          }}
        />
      </CustomDialog>
    </>
  );
};

export default AddOtherFoodItem;