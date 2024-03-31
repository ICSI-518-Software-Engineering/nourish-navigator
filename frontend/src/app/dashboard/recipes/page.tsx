"use client";

import CustomDialog from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { DEFAULTS } from "@/lib/constants";
import { Divider, Stack, Typography } from "@mui/material";
import { SearchIcon } from "lucide-react";
import React from "react";
import RecipeSearchForm from "./RecipeSearchForm";

const RecipesPage: React.FC = () => {
  const hasData = true;

  return (
    <Stack gap="1rem">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Title Text */}
        <Typography variant="h4" fontWeight="bold">
          Search for Recipes
        </Typography>

        {/* Update Meal Plan Dialog */}
        {hasData && (
          <CustomDialog
            className="max-w-2xl"
            dialogTrigger={
              <Button className="border-gold-600 border">
                <SearchIcon size="1rem" className="mr-2" />
                Modify Search
              </Button>
            }
            dialogTitle="Modify Recipe Search"
          >
            <Divider color={DEFAULTS.textColor} />
            <RecipeSearchForm notAsCard />
          </CustomDialog>
        )}
      </Stack>

      {/* Initial Search */}
      <Typography color={DEFAULTS.textColor}>
        Perform a new recipe search
      </Typography>
      <RecipeSearchForm />
    </Stack>
  );
};

export default RecipesPage;
