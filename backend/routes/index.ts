import { Express } from "express";
import recipeSearchRoutes from "./recipeSearchRoutes";
import userProfileRoutes from "./userProfileRoutes";
import userRoutes from "./userRoutes";

export default function (app: Express) {
  app.use("/api/auth", userRoutes);
  app.use("/api/user", userProfileRoutes);
  app.use("/api/recipes", recipeSearchRoutes);
}
