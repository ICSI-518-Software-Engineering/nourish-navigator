import { Express } from "express";
import userProfileRoutes from "./userProfileRoutes";
import userRoutes from "./userRoutes";
import mealPlanningRoutes from "./mealPlanningRoutes";

export default function (app: Express) {
  app.use("/api/auth", userRoutes);
  app.use("/api/user", userProfileRoutes);
  app.use("/api/planner", mealPlanningRoutes);
}
