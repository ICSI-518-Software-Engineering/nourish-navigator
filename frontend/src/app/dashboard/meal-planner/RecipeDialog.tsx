import CustomDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MealPlanNutrientsType,
  MealPlanRecordItemType,
  computeNutritionValues,
} from "./dataAndTypes";

type RecipeDialogProps = {
  isOpen: boolean;
  meal: MealPlanRecordItemType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeDialog: React.FC<RecipeDialogProps> = ({ meal, ...props }) => {
  return (
    <CustomDialog
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      dialogTitle={meal?.label}
      className="w-[50vw]"
    >
      <Stack direction="row" gap="2rem" maxHeight="69.5vh" overflow="auto">
        {/* Left Container */}
        <Stack gap="1.5rem">
          {/* Top Container */}
          <Stack direction="row" gap="1rem" mt="1rem">
            <Image
              src={meal?.image}
              alt={meal?.label}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <Stack justifyContent="space-evenly" alignItems="start">
              {/* Calories */}
              <Typography align="center">
                <b>Calories / Serving :</b>{" "}
                {computeNutritionValues(
                  meal?.totalNutrients?.ENERC_KCAL,
                  meal?.yield
                )}
              </Typography>

              {/* Servings */}
              <Typography align="center">
                <b>Servings :</b> {meal?.yield}
              </Typography>

              {/* Diet Labels */}
              <Stack gap="0.5rem">
                <Typography fontWeight="bold">Contains</Typography>
                <Stack direction="row" gap="0.5rem" flexWrap="wrap">
                  {meal?.cautions?.map?.((c) => (
                    <Chip key={c} label={c} color="error" variant="outlined" />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Ingridents Section */}
          <Stack gap="0.5rem">
            <Divider>Ingredients</Divider>
            <Stack gap="0.25rem">
              {meal?.ingredientLines?.map((i) => (
                <Typography key={i}>{i}</Typography>
              ))}
            </Stack>
          </Stack>

          <Button>
            <Link href={meal?.url} target="_blank">
              View cooking instructions
            </Link>
          </Button>
        </Stack>

        {/* Divider */}
        <Divider orientation="vertical" />

        {/* Right Container */}
        <Stack maxHeight="69.5vh" overflow="auto" gap="1rem" flexGrow={1}>
          <Typography variant="h6">Nutrition Values</Typography>
          {(
            Object.values(meal?.totalNutrients) as MealPlanNutrientsType[]
          )?.map?.((n) => (
            <Typography key={n.label} display="flex">
              <span className="w-44">{n.label}</span>{" "}
              {computeNutritionValues(n, meal?.yield)}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </CustomDialog>
  );
};

export default RecipeDialog;
