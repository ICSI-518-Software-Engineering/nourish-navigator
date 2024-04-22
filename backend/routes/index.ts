import { Express } from "express";
import mealPlanningRoutes from "./mealPlanningRoutes";
import recipeSearchRoutes from "./recipeSearchRoutes";
import userActivityRoutes from "./userActivityRoutes";
import userProfileRoutes from "./userProfileRoutes";
import userRoutes from "./userRoutes";

export default function (app: Express) {
  app.use("/api/auth", userRoutes);
  app.use("/api/user", userProfileRoutes);
  app.use("/api/recipes", recipeSearchRoutes);
  app.use("/api/activity", userActivityRoutes);
  app.use("/api/planner", mealPlanningRoutes);
}