import { Response, Router } from "express";
import User from "../models/userModel";
import { mealPlanService } from "../scripts/mealPlanning";

const mealPlanningRoutes = Router();

// get profile api
mealPlanningRoutes.get("/mealselection/:userid", async (req, res: Response) => {
  const user = await User.findById(req.params.userid, {
    password: false,
    isAdmin: false,
  });
  if (!user) {
    return;
  }
  const mealBody = await mealPlanService(user, req.params.userid, 3);
  res.send(mealBody);
});

export default mealPlanningRoutes;