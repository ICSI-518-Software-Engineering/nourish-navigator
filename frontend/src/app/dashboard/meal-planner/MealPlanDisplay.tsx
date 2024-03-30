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
import { MealPlanRecordItemType, MealPlanRecordType } from "./dataAndTypes";

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
      </CardContent>
    </Card>
  );
};
