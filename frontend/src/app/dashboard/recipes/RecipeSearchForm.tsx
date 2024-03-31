import CustomInput from "@/components/CustomInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  RecipeSearchFormDataType,
  allergiesOptions,
  dietOptions,
  recipeSearchZodSchema,
} from "./dataAndTypes";

type RecipeSearchFormProps = {
  notAsCard?: boolean;
};

const RecipeSearchForm: React.FC<RecipeSearchFormProps> = ({ notAsCard }) => {
  if (notAsCard) {
    return <RecipeSearchFormBase />;
  }

  return (
    <Card className="p-10 max-w-xl">
      <RecipeSearchFormBase />
    </Card>
  );
};

export default RecipeSearchForm;

/**
 * ================= BASE FORM ==================
 */

const RecipeSearchFormBase: React.FC = () => {
  // const { mutate: updateUserProfile, isPending } =
  //   useUpdateUserProfileService();
  // const { data: userProfile } = useGetUserProfileService();
  // const mealPlanProfile = userProfile?.mealPlanProfile;
  const isPending = false;

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

  const onSave = useCallback((data: RecipeSearchFormDataType) => {
    //     const user = getLoggedInUserDetails();
    //     if (!user) return;
    //     updateUserProfile(
    //       {
    //         userId: user?._id,
    //         mealPlanProfile: data,
    //       },
    //       { onSuccess: (d) => toast.success(d) }
    //     );
    //   },
    return null;
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col gap-5"
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

      <Button className="self-end" disabled={isPending}>
        <LoadingSpinner isVisible={isPending} /> Submit
      </Button>
    </Box>
  );
};
