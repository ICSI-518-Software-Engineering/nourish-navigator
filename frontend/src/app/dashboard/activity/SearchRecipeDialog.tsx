import { useRecipeSearchService } from "@/api/recipe";
import RecipeCard from "@/components/RecipeCard";
import {
  Box,
  Divider,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { MealPlanRecordItemType } from "../meal-planner/dataAndTypes";
import RecipeSearchForm from "../recipes/RecipeSearchForm";

type SearchRecipeDialogProps = {
  recipeCardActions: (item: MealPlanRecordItemType) => React.ReactNode;
};

const SearchRecipeDialog: React.FC<SearchRecipeDialogProps> = ({
  recipeCardActions,
}) => {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  const {
    data: recipes,
    mutate: searchForRecipes,
    isPending: isSearchingForRecipes,
  } = useRecipeSearchService();

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap="2rem"
      height="100%"
      mt="0.5rem"
    >
      {/* Recipe Search Form */}
      <Box minWidth="40%">
        <RecipeSearchForm
          notAsCard
          onSubmit={(d) => searchForRecipes(d)}
          isLoading={isSearchingForRecipes}
        />
      </Box>

      {/* Divider */}

      <Divider orientation={isLargeScreen ? "vertical" : "horizontal"} />

      {/* Recipe Search Results */}
      <Stack
        direction="row"
        flexWrap="wrap"
        flexGrow={1}
        gap="2rem"
        overflow={{ xs: "initial", lg: "auto" }}
        maxHeight={{ xs: undefined, lg: "60vh" }}
        width={{ xs: "100%", lg: "auto" }}
      >
        {/* Start search for recipes */}
        {!recipes && (
          <Stack alignItems="center" justifyContent="center" width="100%">
            <Typography className="text-muted-foreground">
              Start search for a recipes
            </Typography>
          </Stack>
        )}

        {/* No Recipes Found */}
        {recipes && recipes.length === 0 && (
          <Stack alignItems="center" justifyContent="center" width="100%">
            <Typography className="text-muted-foreground">
              No recipes found. please search again.
            </Typography>
          </Stack>
        )}

        {recipes?.map?.((r, idx) => (
          <RecipeCard
            key={r.url + idx.toString()}
            recipeItem={r}
            actions={recipeCardActions(r)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SearchRecipeDialog;