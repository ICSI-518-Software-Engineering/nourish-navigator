import { Response, Router } from "express";
import User from "../models/userModel";
import { mealPlanService } from "../scripts/mealPlanning";

const mealPlanningRoutes = Router();

// get profile api
mealPlanningRoutes.get("/meals/:userid", async (req, res: Response) => {
    const user = await User.findById(req.params.userid, {
        password: false,
        isAdmin: false,
      });
    if (!user){return}
    mealPlanService(user.userNutrition)
  });

export default mealPlanningRoutes;
