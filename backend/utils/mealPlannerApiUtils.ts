import axios, { AxiosResponse } from "axios";
import { UserObjectType } from "../models/userModel";

const appId = process.env.MEAL_PLAN_API_APP_ID;
const appKey = process.env.MEAL_PLAN_API_APP_KEY;

const http = axios.create({
  baseURL: "https://api.edamam.com/api",
  params: {
    app_key: appKey,
    app_id: appId,
  },
});

// edamam api is being used for meal planning

const KEYS = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
};

const prepareMealPlanApiRequest = (user: UserObjectType) => {
  const { mealPlanProfile } = user;

  const mealTimings = new Set(mealPlanProfile.mealsTimings);

  const sections: Record<string, unknown> = {};

  //   Breakfast
  if (mealTimings.has(KEYS.breakfast)) {
    sections.Breakfast = {
      accept: {
        all: [
          {
            dish: mealPlanProfile.mealCategories,
          },
          { meal: [KEYS.breakfast] },
        ],
      },
    };
  }

  //   Lunch
  if (mealTimings.has(KEYS.lunch)) {
    sections.Lunch = {
      accept: {
        all: [
          {
            dish: mealPlanProfile.mealCategories,
          },
          { meal: [`${KEYS.lunch}/${KEYS.dinner}`] },
        ],
      },
    };
  }

  //   Dinner
  if (mealTimings.has(KEYS.dinner)) {
    sections.Dinner = {
      accept: {
        all: [
          {
            dish: mealPlanProfile.mealCategories,
          },
          { meal: [`${KEYS.lunch}/${KEYS.dinner}`] },
        ],
      },
    };
  }

  return {
    size: parseInt(mealPlanProfile.noOfDays),
    plan: {
      accept: {
        all: [
          // {
          //     "health" : userProfile.allergies
          // },
          // {
          //     diet: userProfile.dietaryPreference
          // }
        ],
      },
      fit: {
        ENERC_KCAL: {
          min: parseInt(mealPlanProfile.minCaloriesPerDay),
          max: parseInt(mealPlanProfile.maxCaloriesPerDay),
        },
      },
      sections: sections,
    },
  };
};

const getRecipeDetails = (apiUrl: string) => {
  return http.get<RecipeApiResponseType>("/recipes/v2/by-uri", {
    params: {
      type: "public",
      uri: apiUrl,
      app_id: appId,
      app_key: appKey,
    },
  });
};

export const generateMealPlan = async (user: UserObjectType) => {
  const reqBody = prepareMealPlanApiRequest(user);

  //   Get the meal plan
  const res = await http.post<MealPlanApiResponseType>(
    `meal-planner/v1/${appId}/select`,
    reqBody
  );
  const mealPlan: Record<string, unknown>[] = [];

  const recipePromises: Promise<AxiosResponse<RecipeApiResponseType, any>>[] =
    [];

  if (res && res.data) {
    const selections = res.data.selection;

    if (selections) {
      // Restructuring data
      selections.forEach((selection) => {
        const resultObj: Record<string, unknown> = {};
        const { Breakfast, Dinner, Lunch } = selection.sections;

        if (Breakfast) {
          resultObj[KEYS.breakfast] = Breakfast.assigned;
          recipePromises.push(getRecipeDetails(Breakfast.assigned));
        }
        if (Dinner) {
          resultObj[KEYS.dinner] = Dinner.assigned;
          recipePromises.push(getRecipeDetails(Dinner.assigned));
        }
        if (Lunch) {
          resultObj[KEYS.lunch] = Lunch.assigned;
          recipePromises.push(getRecipeDetails(Lunch.assigned));
        }
        mealPlan.push(resultObj);
      });

      //   Resolving promises
      const recipesResponsesMap: Record<string, unknown> = {};
      const resolvedRecipePromises = await Promise.all(recipePromises);

      resolvedRecipePromises.forEach((item) => {
        const recipeData = item.data?.hits?.[0]?.recipe;
        const uri = recipeData?.uri;
        if (uri) {
          recipesResponsesMap[uri] = recipeData;
        }
      });

      // Updating meal plan object
      mealPlan.forEach((item) => {
        const { breakfast, lunch, dinner } = item;

        if (breakfast) {
          item.breakfast = recipesResponsesMap[breakfast as string];
        }
        if (lunch) {
          item.lunch = recipesResponsesMap[lunch as string];
        }
        if (dinner) {
          item.dinner = recipesResponsesMap[dinner as string];
        }
      });
    }
  }
  return mealPlan;
};

/**
 * ========================= API RESPONSE TYPE ==========================
 */

type MealPlanApiSectionsType = {
  assigned: string;
};

type MealPlanApiSelectionItemType = {
  sections: {
    Breakfast?: MealPlanApiSectionsType;
    Lunch?: MealPlanApiSectionsType;
    Dinner?: MealPlanApiSectionsType;
  };
};

type MealPlanApiResponseType = {
  status: string;
  selection: MealPlanApiSelectionItemType[];
};

type RecipeApiHitItemType = {
  recipe: {
    uri: string;
  };
};

type RecipeApiResponseType = {
  hits: RecipeApiHitItemType[];
};
