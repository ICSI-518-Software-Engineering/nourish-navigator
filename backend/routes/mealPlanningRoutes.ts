import { Response, Router } from "express";
import User from "../models/userModel";
import { mealPlanService } from "../scripts/mealPlanning";
import { MongooseAPIMealSchema } from "../models/userDailyMealPlanModel";
//import { UserMealPlanDataType } from "../models/userDailyMealPlanModel";

const mealPlanningRoutes = Router();

// get profile api
mealPlanningRoutes.get("/mealselection/:userid", async (req, res: Response) => {
    const user = await User.findById(req.params.userid, {
        password: false,
        isAdmin: false,
      });
    if (!user){return}
    const mealBody = await mealPlanService(user, req.params.userid, 3)
    res.send(mealBody)
  });

mealPlanningRoutes.post("/adddislikemeal/:userid", async (req, res: Response) => {
  try{
    const user = await User.findById(req.params.userid, {
      password: false,
      isAdmin: false,
    });

    var exists = false;

    user?.dislikedMeals.forEach(meal =>{
       if(meal.mealName == req.body.meal.mealName){
          exists = true;
       }
    });

    if (!exists) {
      // Add the new meal to the dislikedMeals array
      user?.dislikedMeals.push(req.body.meal);
      // Save the updated user document
      await user?.save();
      console.log('Meal added to dislikedMeals.');
    } else {
      console.log('Meal already exists in dislikedMeals.');
    }
    res.sendStatus(200)
  }
  catch (error) {
    console.error('Error adding meal to dislikedMeals:', error);
  }
});

mealPlanningRoutes.post("/removedislikemeal/:userid", async (req, res: Response) => {
  try{
    const user = await User.findById(req.params.userid, {
      password: false,
      isAdmin: false,
    });
    const mealIndex = user?.dislikedMeals.findIndex(dislikedMeal => dislikedMeal.mealName === req.body.meal.mealName);

    if (typeof mealIndex === "number" && mealIndex !== -1) {
      user?.dislikedMeals.splice(mealIndex, 1);
      await user?.save();
      console.log('Meal removed from dislikedMeals.');
    } else {
      console.log('Meal does not exist in dislikedMeals.');
    }
    res.sendStatus(200)
  }
  catch (error) {
    console.error('Error adding meal to dislikedMeals:', error);
  }
});

mealPlanningRoutes.post("/addlikemeal/:userid", async (req, res: Response) => {
  try{
    const user = await User.findById(req.params.userid, {
      password: false,
      isAdmin: false,
    });

    var exists = false;

    user?.likedMeals.forEach(meal =>{
       if(meal.mealName == req.body.meal.mealName){
          exists = true;
       }
    });

    if (!exists) {
      // Add the new meal to the dislikedMeals array
      user?.likedMeals.push(req.body.meal);
      // Save the updated user document
      await user?.save();
      console.log('Meal added to likedMeals.');
    } else {
      console.log('Meal already exists in likedMeals.');
    }
    res.sendStatus(200)
  }
  catch (error) {
    console.error('Error adding meal to likedMeals:', error);
  }
});

mealPlanningRoutes.post("/removelikemeal/:userid", async (req, res: Response) => {
  try{
    const user = await User.findById(req.params.userid, {
      password: false,
      isAdmin: false,
    });
    const mealIndex = user?.likedMeals.findIndex(likedMeal => likedMeal.mealName === req.body.meal.mealName);

    if (typeof mealIndex === "number" && mealIndex !== -1) {
      user?.likedMeals.splice(mealIndex, 1);
      await user?.save();
      console.log('Meal removed from likedMeals.');
    } else {
      console.log('Meal does not exist in likedMeals.');
    }
    res.sendStatus(200)
  }
  catch (error) {
    console.error('Error adding meal to likedMeals:', error);
  }
});

export default mealPlanningRoutes;
