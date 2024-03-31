import CustomInput from "@/components/CustomInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import {
  RecipeSearchFormDataType,
  allergiesOptions,
  dietOptions,
  recipeSearchZodSchema,
} from "./dataAndTypes";

type RecipeSearchFormProps = {
  notAsCard?: boolean;
} & RecipeSearchFormBaseProps;

const RecipeSearchForm: React.FC<RecipeSearchFormProps> = ({
  notAsCard,
  ...props
}) => {
  if (notAsCard) {
    return <RecipeSearchFormBase {...props} />;
  }

  return (
    <Card className="p-10 max-w-xl">
      <RecipeSearchFormBase {...props} />
    </Card>
  );
};

export default RecipeSearchForm;

/**
 * ================= BASE FORM ==================
 */

type RecipeSearchFormBaseProps = {
  onSubmit: (data: RecipeSearchFormDataType) => unknown;
  isLoading: boolean;
};

const RecipeSearchFormBase: React.FC<RecipeSearchFormBaseProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeSearchFormDataType>({
    defaultValues: {
      keywords: "",
      allergies: [],
      diets: [],
      maxCalories: "100",
    },
    resolver: zodResolver(recipeSearchZodSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7"
    >
      {/* Keywords Input */}
      <CustomInput
        id="keywords"
        errors={errors}
        label="Recipe Name"
        register={register}
        placeholder="Enter any number of keywords to search"
        description="Examples: coffee, chicken sandwich"
      />

      {/* Calories */}
      <CustomInput
        id="maxCalories"
        register={register}
        label="Max Calories"
        errors={errors}
        type="number"
        className="h-auto py-0 w-full"
        inputProps={{ min: 1 }}
        placeholder="Maximum number of calories"
        description="Maximum calories for a recipe"
      />

      {/* Allergies */}
      <MultiSelect
        control={control}
        id="allergies"
        options={allergiesOptions}
        label="Allergies"
        placeholder="Food Allergies (Optional)"
        description="Used to filter recipes"
      />

      {/* Diets */}
      <MultiSelect
        id="diets"
        control={control}
        options={dietOptions}
        label="Diet"
        placeholder="Diet Preferences (Optional)"
        description="Used to filter recipes"
      />

      <Button className="self-end" disabled={isLoading}>
        <LoadingSpinner isVisible={isLoading} />
        Submit
      </Button>
    </Box>
  );
};
