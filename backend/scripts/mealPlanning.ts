import axios from 'axios'
import User from "../models/userModel";
import { UserNutritionRequestDataType } from '../models/userNutritionModel'
import { UserMealPlanDataType, userMealPlanZodSchema } from '../models/userDailyMealPlanModel';

async function dayMealPlan(userNutrition: UserNutritionRequestDataType, partition: number, varDate: string){
    const totalCalories = userNutrition.calorieTarget
    var today: string = varDate
    try {
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: 'public',
                dishType: 'main course',
                app_id: 'de80bcac',
                app_key: 'b780c80a7be2129a489cf65f422e8b5b',
                calories: '500-800',
            }
        });

        const meals = response.data.hits.map((hit: any) => ({
            mealName: hit.recipe.label,
            calories: hit.recipe.calories / hit.recipe.yield,
            image: hit.recipe.image,
            instructions: hit.recipe.url,
            protein: hit.recipe.totalNutrients.PROCNT.quantity / hit.recipe.yield,
            fat: hit.recipe.totalNutrients.FAT.quantity / hit.recipe.yield,
            carbs: hit.recipe.totalNutrients.CHOCDF.quantity / hit.recipe.yield,
            //ingredients: hit.recipe.ingredients
        }));
        
        const bestCombo = findBestMealCombo(meals, totalCalories);

        if (bestCombo != null){
            var mealPlan: UserMealPlanDataType = {
                date: today,
                meal: bestCombo
            }
        
            return mealPlan
        }
    }
    catch{

    }
}

function caloriePerMeal(totalCalories: string){
    const partition = Math.round(parseFloat(totalCalories)/3)
    return partition
}

function findBestMealCombo(meals: any, targetCalories: string) {
    let target = parseFloat(targetCalories)
    let bestCombo = null;
    let closestDiff = Infinity;
  
    for (let i = 0; i < meals.length; i++) {
        for (let j = i + 1; j < meals.length; j++) {
            for (let k = j + 1; k < meals.length; k++) {
                const comboCalories = meals[i].calories + meals[j].calories + meals[k].calories;
                const diff = Math.abs(target - comboCalories);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestCombo = [meals[i], meals[j], meals[k]];
                }
            }
        }
    }
    return bestCombo;
  }

export async function mealPlanService(user: any, id: any){
    const today = new Date()
    const testToday = today.toDateString()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    const testTomorrow = tomorrow.toDateString()

    console.log(testToday)
    console.log(testTomorrow)

    today.setDate(today.getDate())

    var todayFlag = false
    var tomorrowFlag = false
    const test = await User.findById(id)
    test?.mealPlan.forEach(element => {
        if(element.date === testToday){
            todayFlag = true
        }
        if (element.date === testTomorrow){
            tomorrowFlag = true
        }
    });

    const userNutrition = user.userNutrition
    const totalCalories = userNutrition.calorieTarget

    if (totalCalories != null){
        if(!todayFlag){
            const partition = caloriePerMeal(totalCalories)
            const mealBody = await dayMealPlan(userNutrition, partition, testToday)
            const update = await User.findByIdAndUpdate(id, {
                $push: {mealPlan: mealBody}
              });
              await update?.save();
        }
        if(!tomorrowFlag){
            const partition = caloriePerMeal(totalCalories)
            const mealBody = await dayMealPlan(userNutrition, partition, testTomorrow)
            const update = await User.findByIdAndUpdate(id, {
                $push: {mealPlan: mealBody}
              });
              await update?.save();
        }
    }
}
