import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
<<<<<<< HEAD
import {
  MealPlanNutrientsType,
  MealPlanRecordItemType,
  MealPlanRecordType,
} from "./dataAndTypes";
=======
import { MealPlanRecordItemType, MealPlanRecordType } from "./dataAndTypes";
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52

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
        Day {mealPlanItem.day}
      </Typography>
      {/* Cards */}
      <Stack gap="1.5rem">
        {/* Breakfast */}
        <MealPlanItemCard
          title="Breakfast"
          mealPlanItem={mealPlanItem.breakfast}
        />
        {/* Lunch */}
        <MealPlanItemCard title="Lunch" mealPlanItem={mealPlanItem.lunch} />
        {/* Dinner */}
        <MealPlanItemCard title="Dinner" mealPlanItem={mealPlanItem.dinner} />
      </Stack>
    </Box>
  );
};

export default MealPlanDisplay;

/**
 * =============== MEAL PLAN ITEM CARD ===================
 */

type MealPlanItemCardProps = {
  title: string;
  mealPlanItem?: MealPlanRecordItemType;
};

const MealPlanItemCard: React.FC<MealPlanItemCardProps> = ({
  title,
  mealPlanItem: item,
}) => {
  if (!item) {
    return null;
  }

<<<<<<< HEAD
  const calories = item?.totalNutrients?.ENERC_KCAL;
  const protein = item?.totalNutrients?.PROCNT;
  const carbs = item?.totalNutrients?.CHOCDF;
  const fat = item?.totalNutrients?.FAT;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-gold-500" title={item.label}>
          {item.label}
        </CardTitle>
        <CardDescription>
          {computeNutritionValues(calories, item.yield)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stack direction="row" gap="1rem">
          {/* Image */}
          <Box width="100%" height="10rem">
            <Image
              src={item.image}
              alt="recipe-image"
              width={200}
              height={200}
              className="w-full h-[10rem] object-cover"
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
=======
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1" title={item.label}>
          {item.label}
        </CardTitle>
        <CardDescription>{item.calories?.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Box width="100%" height="10rem">
          <Image
            src={item.image}
            alt="recipe-image"
            width={200}
            height={200}
            className="w-full h-[10rem] object-cover"
          />
        </Box>
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52
      </CardContent>
    </Card>
  );
};
<<<<<<< HEAD

/**
 * ================ UTILITY FUNCTIONS =============
 */
const computeNutritionValues = (
  inputs: MealPlanNutrientsType,
  quantity: number
) => {
  return Math.round(inputs.quantity / quantity) + " " + inputs.unit;
};
=======
>>>>>>> 3bd6fb090b5bb743d33ee3c80957f04cdaee5e52
