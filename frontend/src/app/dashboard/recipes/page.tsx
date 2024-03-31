"use client";

import { useRecipeSearchService } from "@/api/recipe";
import CustomDialog from "@/components/CustomDialog";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { DEFAULTS } from "@/lib/constants";
import { Divider, Stack, Typography } from "@mui/material";
import { SearchIcon } from "lucide-react";
import React from "react";
import RecipeSearchForm from "./RecipeSearchForm";

const RecipesPage: React.FC = () => {
  const {
    data: recipes,
    mutate: searchForRecipes,
    isPending,
  } = useRecipeSearchService();

  return (
    <Stack gap="1rem">
      {/* Title & New Search */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Title Text */}
        <Typography variant="h4" fontWeight="bold">
          Search for Recipes
        </Typography>

        {/* Update Meal Plan Dialog */}
        {recipes && (
          <CustomDialog
            className="max-w-2xl"
            dialogTrigger={
              <Button className="border-gold-600 border">
                <SearchIcon size="1rem" className="mr-2" />
                New Search
              </Button>
            }
            dialogTitle="Modify Recipe Search"
          >
            <Divider color={DEFAULTS.textColor} />
            <RecipeSearchForm
              notAsCard
              onSubmit={(d) => searchForRecipes(d)}
              isLoading={isPending}
            />
          </CustomDialog>
        )}
      </Stack>

      {/* Initial Search Form */}
      {!recipes && (
        <>
          <Typography color={DEFAULTS.textColor}>
            Perform a new recipe search
          </Typography>
          <RecipeSearchForm
            onSubmit={(d) => searchForRecipes(d)}
            isLoading={isPending}
          />
        </>
      )}

      {/* Recipes */}

      {recipes && (
        <>
          <Typography color={DEFAULTS.textColor}>
            Here are the recipes based on your search
          </Typography>
          <Stack
            direction="row"
            gap="1.5rem"
            flexWrap="wrap"
            overflow="auto"
            height="75vh"
          >
            {recipes?.map?.((recipe) => (
              <RecipeCard key={recipe?.label} recipeItem={recipe} />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default RecipesPage;
