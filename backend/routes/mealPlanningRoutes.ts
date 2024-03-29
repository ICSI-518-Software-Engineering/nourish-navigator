import { Response, Router } from "express";

const mealPlanningRoutes = Router();

// get profile api
mealPlanningRoutes.get("/meals/:userid", async (req, res: Response) => {
    console.log(req.params.userid);
    console.log('test')
  });

export default mealPlanningRoutes;
