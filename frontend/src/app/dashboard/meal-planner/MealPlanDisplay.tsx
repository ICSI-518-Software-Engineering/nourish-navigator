import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { MoonIcon, SunIcon, UtensilsIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import RecipeDialog from "../../../components/RecipeDialog";
import {
  MealPlanRecordItemType,
  MealPlanRecordType,
  computeNutritionValues,
} from "./dataAndTypes";

type MealPlanDisplayProps = {
  mealPlanItem: MealPlanRecordType;
};

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ mealPlanItem }) => {
  if (!mealPlanItem) {
    return null;
  }

  return (
    <Box
      component={Paper}
      p="1rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
      flexShrink={0}
      width="25rem"
      borderRadius="1rem"
      bgcolor="transparent"
      elevation={2}
    >
      <Typography textAlign="center" variant="h6" position="sticky" top={0}>
        Day {mealPlanItem.day} ({mealPlanItem.date})
      </Typography>
      {/* Cards */}
      <Stack gap="1.5rem">
        {/* Breakfast */}
        <MealPlanItemCard
          icon={
            <Tooltip title="Breakfast">
              <SunIcon size="1.25rem" />
            </Tooltip>
          }
          mealPlanItem={mealPlanItem.breakfast}
        />
        {/* Lunch */}
        <MealPlanItemCard
          icon={
            <Tooltip title="Lunch">
              <UtensilsIcon size="1.25rem" />
            </Tooltip>
          }
          mealPlanItem={mealPlanItem.lunch}
        />
        {/* Dinner */}
        <MealPlanItemCard
          icon={
            <Tooltip title="Dinner">
              <MoonIcon size="1.25rem" />
            </Tooltip>
          }
          mealPlanItem={mealPlanItem.dinner}
        />
      </Stack>
    </Box>
  );
};

export default MealPlanDisplay;

/**
 * =============== MEAL PLAN ITEM CARD ===================
 */

type MealPlanItemCardProps = {
  icon: React.ReactNode;
  mealPlanItem?: MealPlanRecordItemType;
};

const MealPlanItemCard: React.FC<MealPlanItemCardProps> = ({
  icon,
  mealPlanItem: item,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  if (!item) {
    return null;
  }

  const calories = item?.totalNutrients?.ENERC_KCAL;
  const protein = item?.totalNutrients?.PROCNT;
  const carbs = item?.totalNutrients?.CHOCDF;
  const fat = item?.totalNutrients?.FAT;

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="whitespace-nowrap text-ellipsis w-72 overflow-hidden text-gold-500 pb-1.5"
          title={item.label}
        >
          {item.label}
        </CardTitle>
        <CardDescription className="font-bold flex items-center gap-2">
          {computeNutritionValues(calories, item.yield)} {icon}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="0.5rem">
          {/* Content */}
          <Stack direction="row" gap="1rem">
            {/* Image */}
            <Box width="100%" height="10rem" className="border rounded-lg">
              <Image
                src={item.image}
                alt="recipe-image"
                width={200}
                height={200}
                className="w-full max-h-full object-cover rounded-lg p-1"
              />
            </Box>

            {/* Nutrients */}
            <Stack justifyContent="center" gap="1.25rem" whiteSpace="nowrap">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="0.9rem" width="4rem" fontWeight="bold">
                  Protien
                </Typography>
                <Typography fontSize="0.9rem">
                  {computeNutritionValues(protein, item.yield)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="0.9rem" width="4rem" fontWeight="bold">
                  Fat
                </Typography>
                <Typography fontSize="0.9rem">
                  {computeNutritionValues(fat, item.yield)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="0.9rem" width="4rem" fontWeight="bold">
                  Carbs
                </Typography>
                <Typography fontSize="0.9rem">
                  {computeNutritionValues(carbs, item.yield)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Actions */}
          <Stack direction="row" gap="1rem">
            {/* View Recipe Button */}
            <Button
              size="sm"
              onClick={() => setIsOpen(true)}
              className="flex-grow"
            >
              View Recipe
            </Button>
          </Stack>
        </Stack>
      </CardContent>

      <RecipeDialog isOpen={isOpen} setIsOpen={setIsOpen} meal={item} />
    </Card>
  );
};

// {/* Consumed & Swap Button */}
// <Stack direction="row" gap="0.5rem">
//   {/* Consumed Button */}
//   <Tooltip title="Mark as consumed" arrow>
//     <Button size="sm" variant="outline">
//       <CheckCircleIcon size="1.25rem" />
//     </Button>
//   </Tooltip>

//   {/* Swap Button */}
//   <Tooltip title="Swap with another recipe" arrow>
//     <Button size="sm" variant="outline">
//       <ListRestartIcon size="1.25rem" />
//     </Button>
//   </Tooltip>
// </Stack>
