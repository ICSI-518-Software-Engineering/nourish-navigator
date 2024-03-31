import { Request, Response, Router } from "express";
import { ZodError } from "zod";
import {
  RecipeSearchDataType,
  searchForRecipes,
  validateRecipeSearchRequest,
} from "../utils/recipeSearchApiUtils";

const recipeSearchRoutes = Router();

type RecipeSearchReqType = {
  body: RecipeSearchDataType;
} & Omit<Request, "body">;

recipeSearchRoutes.post(
  "/",
  async (req: RecipeSearchReqType, res: Response) => {
    try {
      validateRecipeSearchRequest(req.body);
      const recipes = await searchForRecipes(req.body);
      return res.json(recipes);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.issues[0].message);
      }

      console.log(error);
      return res.status(500).send("Unknown error occured.");
    }
  }
);

export default recipeSearchRoutes;
