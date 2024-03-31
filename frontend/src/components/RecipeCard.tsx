import {
  MealPlanRecordItemType,
  computeNutritionValues,
} from "@/app/dashboard/meal-planner/dataAndTypes";
import RecipeDialog from "@/components/RecipeDialog";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type RecipeCardProps = {
  icon?: React.ReactNode;
  recipeItem?: MealPlanRecordItemType;
  actions?: React.ReactNode;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  icon,
  recipeItem: item,
  actions,
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
                  Protein
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
            {/* Recipe Button */}
            <Button
              size="sm"
              onClick={() => setIsOpen(true)}
              className="flex-grow"
            >
              View Recipe
            </Button>

            {/* Other Actions */}
            {actions}
          </Stack>
          <RecipeDialog isOpen={isOpen} setIsOpen={setIsOpen} meal={item} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;