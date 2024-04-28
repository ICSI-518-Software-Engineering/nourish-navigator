import { Request, Response, Router } from "express";
import moment from "moment";
import { ZodError } from "zod";
import { DEFAULTS } from "../lib/constants";
import UserActivity from "../models/userActivity";
import User from "../models/userModel";

const userActivityRoutes = Router();

/**
 * Update / Create User Activity API
 */

type UserActivityReqType = {
  body: {
    mealTime: string;
    consumption: string;
    recipe?: JSON;
  };
  params: {
    userId: string;
  };
} & Omit<Request, "body">;

userActivityRoutes.post(
  "/:userId?",
  async (req: UserActivityReqType, res: Response) => {
    try {
      const userId = req.params.userId;
      const today = moment().format(DEFAULTS.dateFormat);
      const mealTime = req.body.mealTime;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).send("Invalid User ID");
      }

      let todaysMealPlan;
      // If there is an user, update the meal plan as per activity
      const newMealPlan = user.mealPlan?.map((item) => {
        if (
          moment(item.date as string, DEFAULTS.dateFormat).isSame(
            moment(),
            "day"
          )
        ) {
          let itemClone = { ...item };

          if (mealTime === "other") {
            const otherRecipeIdx = (
              item?.other as Array<{ uri: string }>
            )?.findIndex(
              (i) =>
                i.uri ===
                (req.body.recipe as unknown as Record<string, string>)?.uri
            );

            const otherRecipe = (item?.other as Array<JSON>)?.[otherRecipeIdx];

            const updatedOtherRecipes = [
              ...(item?.other as Array<Record<string, unknown>>),
            ];
            updatedOtherRecipes[otherRecipeIdx] = {
              ...otherRecipe,
              noOfServingsConsumed: Number(req.body.consumption),
            };

            itemClone = {
              ...item,
              other: updatedOtherRecipes,
            };
          } else {
            itemClone = {
              ...item,
              [mealTime]: req.body.recipe ?? {
                ...(item[mealTime] as object),
                noOfServingsConsumed: Number(req.body.consumption),
              },
            };
          }

          todaysMealPlan = { ...itemClone };
          return itemClone;
        }

        return item;
      });

      user.mealPlan = newMealPlan;
      await user.save();

      // Add an entry to activity collection
      let activity = await UserActivity.findOne({
        userId: userId,
        date: today,
      });

      if (!activity) {
        activity = await UserActivity.create({
          userId: userId,
        });
      }

      const nutrientInfo = computeNutrientInfo(todaysMealPlan);

      activity.totalCalories = nutrientInfo?.totalCalories;
      activity.totalFat = nutrientInfo?.totalFat;
      activity.totalProtein = nutrientInfo?.totalProtein;

      if (!activity.currentWeight) {
        const previousWeight = (
          await UserActivity.findOne(
            {
              userId: userId,
              currentWeight: {
                $ne: null,
              },
            },
            { currentWeight: true }
          ).sort("-createdAt")
        )?.currentWeight;
        if (previousWeight) {
          activity.currentWeight = previousWeight;
        }
      }

      await activity.save();

      return res.send("Activity updated successfully.");
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.issues[0].message);
      }

      console.log(error);
      return res.status(500).send("Unknown error occured.");
    }
  }
);

/**
 * Get User Activity API
 */

userActivityRoutes.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) return res.status(400).send("User ID is required");

    const activity = await UserActivity.find({
      userId: userId,
    });

    return res.json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown error occured.");
  }
});

/**
 * Current Weight API
 */

userActivityRoutes.post("/current-weight/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = moment().format(DEFAULTS.dateFormat);

    if (!userId) return res.status(400).send("User ID is required");

    let activity = await UserActivity.findOne({
      userId: userId,
      date: today,
    });

    if (!activity) {
      activity = await UserActivity.create({
        userId: userId,
      });
    }

    activity.currentWeight = req.body.weight;
    await activity.save();

    return res.json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown error occured.");
  }
});

/**
 * Add Recipe API
 */

userActivityRoutes.post("/add-other-recipe/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) return res.status(400).send("User ID is required");

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("No user found!!!");
    }

    const todaysMealPlanIdx = user.mealPlan?.findIndex?.((t) =>
      moment(t.date as string, DEFAULTS.dateFormat).isSame(moment(), "day")
    );

    if (todaysMealPlanIdx === -1) {
      return res.status(400).send("No meal plan found...");
    }

    const todaysMealPlan = user.mealPlan[todaysMealPlanIdx];

    if (todaysMealPlan.other instanceof Array) {
      (todaysMealPlan.other as Array<JSON>).push?.(req.body);
    } else {
      todaysMealPlan.other = [req.body];
    }

    user.mealPlan[todaysMealPlanIdx] = { ...todaysMealPlan };

    await User.findByIdAndUpdate(userId, user);

    return res.send("Addition of recipe to today's meal plan is successful.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown error occured.");
  }
});

/**
 * Remove recipe API
 */

userActivityRoutes.delete("/remove-other-recipe/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recipeUri = req.query.recipeUri;

    if (!userId) return res.status(400).send("User ID is required");

    if (!recipeUri) return res.status(400).send("Recipe URI is required");

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("No user found!!!");
    }

    const todaysMealPlanIdx = user.mealPlan?.findIndex?.((t) =>
      moment(t.date as string, DEFAULTS.dateFormat).isSame(moment(), "day")
    );

    if (todaysMealPlanIdx === -1) {
      return res.status(400).send("No meal plan found...");
    }

    const todaysMealPlan = user.mealPlan[todaysMealPlanIdx];

    if (todaysMealPlan.other instanceof Array) {
      todaysMealPlan.other = todaysMealPlan.other.filter(
        (i) => i.uri !== recipeUri
      );
    } else {
      todaysMealPlan.other = [];
    }

    console.log(todaysMealPlan.other);

    user.mealPlan[todaysMealPlanIdx] = { ...todaysMealPlan };

    await User.findByIdAndUpdate(userId, user);

    return res.send("Removal of recipe from today's meal plan is successful.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown error occured.");
  }
});

export default userActivityRoutes;

/**
 * ============ Compute nutrient info ==============
 */
const computeNutrientInfo = (mealPlanItem?: Record<string, unknown>) => {
  const res = {
    totalCalories: 0,
    totalFat: 0,
    totalProtein: 0,
  };

  if (!mealPlanItem) return res;

  const breakfast = mealPlanItem.breakfast as Record<string, any>;
  const lunch = mealPlanItem.lunch as Record<string, any>;
  const dinner = mealPlanItem.dinner as Record<string, any>;
  const others = mealPlanItem.other as Record<string, any>[];

  res.totalCalories =
    getCalories(breakfast, breakfast?.noOfServingsConsumed) +
    getCalories(lunch, lunch?.noOfServingsConsumed) +
    getCalories(dinner, dinner?.noOfServingsConsumed) +
    (others?.reduce((total, recipe) => {
      total += getCalories(recipe, recipe?.noOfServingsConsumed);
      return total;
    }, 0) ?? 0);

  res.totalFat =
    getFat(breakfast, breakfast?.noOfServingsConsumed) +
    getFat(lunch, lunch?.noOfServingsConsumed) +
    getFat(dinner, dinner?.noOfServingsConsumed) +
    (others?.reduce((total, recipe) => {
      total += getFat(recipe, recipe?.noOfServingsConsumed);
      return total;
    }, 0) ?? 0);

  res.totalProtein =
    getProtein(breakfast, breakfast?.noOfServingsConsumed) +
    getProtein(lunch, lunch?.noOfServingsConsumed) +
    getProtein(dinner, dinner?.noOfServingsConsumed) +
    (others?.reduce((total, recipe) => {
      total += getProtein(recipe, recipe?.noOfServingsConsumed);
      return total;
    }, 0) ?? 0);

  return res;
};

const getCalories = (recipeItem: Record<string, any>, consumption = 0) => {
  if (!recipeItem) return 0;

  const totalCals = Number(
    recipeItem?.totalNutrients?.ENERC_KCAL?.quantity ?? 0
  );
  const res = (totalCals / Number(recipeItem?.yield)) * Number(consumption);
  return res;
};

const getFat = (recipeItem: Record<string, any>, consumption = 0) => {
  if (!recipeItem) return 0;

  const totalFat = Number(recipeItem?.totalNutrients?.FAT?.quantity ?? 0);
  const res = (totalFat / Number(recipeItem?.yield)) * Number(consumption);
  return res;
};

const getProtein = (recipeItem: Record<string, any>, consumption = 0) => {
  if (!recipeItem) return 0;
  const totalProtein = Number(
    recipeItem?.totalNutrients?.PROCNT?.quantity ?? 0
  );

  const res = (totalProtein / Number(recipeItem?.yield)) * Number(consumption);

  return res;
};