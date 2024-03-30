import axios from 'axios'
import User from "../models/userModel";
//import { UserNutritionRequestDataType } from '../models/userNutritionModel'
import { UserMealPlanDataType, userMealPlanZodSchema } from '../models/userDailyMealPlanModel';

async function dayMealPlan(user: any, partition: number, varDate: string){
    const totalCalories = user.userNutrition.calorieTarget
    const totalProtein = user.userNutrition.proteinTarget
    const totalFat = user.userNutrition.fatTarget
    const totalCarbs = user.userNutrition.carbTarget
    var today: string = varDate
    //console.log(user.userProfile.dietaryPreference.concat(user.userProfile.allergies))
    try {
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: 'public',
                dishType: 'main course',
                app_id: process.env.EDAMAME_ID,
                app_key: process.env.EDAMAME_KEY,
                calories: `${partition-150}-${partition+150}`,
                cuisineType: user.userProfile.cuisinePreferences,
                random: 'true'
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
        
        const bestCombo = findBestMealCombo(meals, totalCalories, totalProtein, totalFat, totalCarbs);

        if (bestCombo != null){
            var mealPlan: UserMealPlanDataType = {
                date: today,
                meal: bestCombo
            }
        
            return mealPlan
        }
    }
    catch (error) {
        console.log(error)
    }
}

//function randomInteger(min: number, max: number) {
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//  }

//function mealRandomizer(response: any){
//    const totalpages = parseInt(response.data.count)/20
//    const test = randomInteger(1, totalpages)
//    console.log(totalpages)
//    console.log(test)
//    console.log(response.data._links.next.href)
//}

function caloriePerMeal(totalCalories: string){
    const partition = Math.round(parseFloat(totalCalories)/3)
    return partition
}

function findBestMealCombo(meals: any, targetCalories: string, targetProtein: string, targetFat: string, targetCarbs: string) {
    let targetCal = parseFloat(targetCalories)
    let targetP = parseFloat(targetProtein)
    let targetF = parseFloat(targetFat)
    let targetC = parseFloat(targetCarbs)
    let bestCombo = null;
    let closestDiff = Infinity;
  
    for (let i = 0; i < meals.length; i++) {
        for (let j = i + 1; j < meals.length; j++) {
            for (let k = j + 1; k < meals.length; k++) {
                const comboCalories = meals[i].calories + meals[j].calories + meals[k].calories;
                const comboProtein = meals[i].protein + meals[j].protein + meals[k].protein;
                const comboFat = meals[i].fat + meals[j].fat + meals[k].fat;
                const comboCarbs = meals[i].carbs + meals[j].carbs + meals[k].carbs;
                const diff = Math.abs(targetCal - comboCalories) + 10*Math.abs(targetP-comboProtein) + 8*Math.abs(targetF-comboFat)+ 5*Math.abs(targetC-comboCarbs);
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
    console.log('starting')
    const today = new Date()
    const testToday = today.toDateString()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    const testTomorrow = tomorrow.toDateString()

    var currentMeals = []

    var todayFlag = false
    var tomorrowFlag = false
    const test = await User.findById(id)
    test?.mealPlan.forEach(element => {
        if(element.date === testToday){
            todayFlag = true
            currentMeals.push(element)
        }
        if (element.date === testTomorrow){
            tomorrowFlag = true
            currentMeals.push(element)
        }
    });

    const userNutrition = user.userNutrition
    const totalCalories = userNutrition.calorieTarget

    if (totalCalories != null){
        if(!todayFlag){
            const partition = caloriePerMeal(totalCalories)
            const mealBody = await dayMealPlan(user, partition, testToday)
            currentMeals.push(mealBody)
            const update = await User.findByIdAndUpdate(id, {
                $push: {mealPlan: mealBody}
              });
              await update?.save();
        }
        if(!tomorrowFlag){
            const partition = caloriePerMeal(totalCalories)
            const mealBody = await dayMealPlan(user, partition, testTomorrow)
            currentMeals.push(mealBody)
            const update = await User.findByIdAndUpdate(id, {
                $push: {mealPlan: mealBody}
              });
              await update?.save();
        }
    }
    return currentMeals
}
