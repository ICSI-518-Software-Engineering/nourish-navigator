import CustomDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  Chip,
  Divider,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MealPlanNutrientsType,
  MealPlanRecordItemType,
  computeNutritionValues,
} from "../app/dashboard/meal-planner/dataAndTypes";

type RecipeDialogProps = {
  isOpen: boolean;
  meal: MealPlanRecordItemType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeDialog: React.FC<RecipeDialogProps> = ({ meal, ...props }) => {
  const isDesktop = useMediaQuery((t: Theme) => t.breakpoints.up("lg"));
  return (
    <CustomDialog
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      dialogTitle={meal?.label}
      className="w-[70vw] lg:w-[50vw]"
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap="2rem"
        maxHeight="69.5vh"
        overflow="auto"
      >
        {/* Left Container */}
        <Stack
          gap="1.5rem"
          overflow={{ xs: "initial", lg: "auto" }}
          px="0.25rem"
        >
          {/* Top Container */}
          <Stack direction={{ xs: "column", md: "row" }} gap="1rem" mt="1rem">
            <Image
              src={meal?.image}
              alt={meal?.label}
              width={200}
              height={200}
              className="rounded-lg w-full md:w-48 h-48 object-fill"
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

          <Link href={meal?.url} target="_blank" className="w-full">
            <Button className="w-full">View cooking instructions</Button>
          </Link>
        </Stack>

        {/* Divider */}
        <Divider orientation={isDesktop ? "vertical" : "horizontal"} />

        {/* Right Container */}
        <Stack
          maxHeight="69.5vh"
          overflow={{ xs: "initial", lg: "auto" }}
          gap="1rem"
          minWidth="40%"
          flexGrow={1}
        >
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