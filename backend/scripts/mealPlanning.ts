import axios from 'axios'
import User from "../models/userModel";
import { UserMealSelectionDataType} from '../models/userDailyMealPlanModel';

async function dayMealPlan(user: any, partition: number, varDate: string){
    try {

        // get dinner meal list
        var dinner = await mealParser(user, partition, "Dinner", false);
        //console.log(dinner.length)
        if (dinner.length == 0){
            dinner = await mealParser(user, partition, "Dinner", true);
        }

        //get breakfast meal list
        var breakfast = await mealParser(user, partition, "Breakfast", false);
        //console.log(breakfast.length)
        if (breakfast.length == 0){
            breakfast = await mealParser(user, partition, "Breakfast", true);
        }

        //get lunch meal list
        var lunch = await mealParser(user, partition, "Lunch", false);
        //console.log(lunch.length)
        if (lunch.length == 0){
            lunch = await mealParser(user, partition, "Lunch", true);
        }
        
        const totalCalories = user.userNutrition.calorieTarget
        const totalProtein = user.userNutrition.proteinTarget
        const totalFat = user.userNutrition.fatTarget
        const totalCarbs = user.userNutrition.carbTarget
        var today: string = varDate
        const bestCombo = findBestMealCombo(breakfast, lunch, dinner, totalCalories, totalProtein, totalFat, totalCarbs);
        if (bestCombo != null){
            var mealPlan: UserMealSelectionDataType = {
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

async function mealParser(user: any, partition: any, mealType: String, retry: Boolean){
    var params = parameterSetter(user, partition, mealType, retry)
    var response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params,
        paramsSerializer: {
            indexes: null // by default: false
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
    }));
    
    return meals 
}

function parameterSetter(user: any, partition: number, type: any, retry: Boolean){
    const dietaryPreference: string[] = []
    if (user.userProfile.dietaryPreference != "" && user.userProfile.dietaryPreference != "DASH"){
        dietaryPreference.push(user.userProfile.dietaryPreference)
    }
    const medical = user.userProfile.allergies
    for (let i=0; i<medical.length; i++){
        dietaryPreference.push(medical[i]);
    }
    var cuisine = [];
    if(!retry){
        cuisine = user.userProfile.cuisinePreferences
    }

    var params = {
        type: 'public',
        dishType: ['main course', 'sandwich'],
        app_id: process.env.EDAMAME_ID,
        app_key: process.env.EDAMAME_KEY,
        mealType: type,
        calories: `${partition-150}-${partition+150}`,
        cuisineType: cuisine,
        random: 'true',
        health: dietaryPreference,
    }

    return params
}

function caloriePerMeal(totalCalories: string){
    const partition = Math.round(parseFloat(totalCalories)/3)
    return partition
}

function findBestMealCombo(breakfast: any, lunch: any, dinner: any, targetCalories: string, targetProtein: string, targetFat: string, targetCarbs: string) {
    let targetCal = parseFloat(targetCalories)
    let targetP = parseFloat(targetProtein)
    let targetF = parseFloat(targetFat)
    let targetC = parseFloat(targetCarbs)
    let bestCombo = null;
    let closestDiff = Infinity;

    for (let i = 0; i < breakfast.length; i++) {
        for (let j = 0;  j < lunch.length; j++) {
            for (let k = 0 ; k < dinner.length; k++) {
                const comboCalories = breakfast[i].calories + lunch[j].calories + dinner[k].calories;
                const comboProtein = breakfast[i].protein + lunch[j].protein + dinner[k].protein;
                const comboFat = breakfast[i].fat + lunch[j].fat + dinner[k].fat;
                const comboCarbs = breakfast[i].carbs + lunch[j].carbs + dinner[k].carbs;
                const diff = Math.abs(targetCal - comboCalories) + 20*Math.abs(targetP-comboProtein) + 8*Math.abs(targetF-comboFat)+ 5*Math.abs(targetC-comboCarbs);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestCombo = [breakfast[i], lunch[j], dinner[k]];
                }
            }
        }
    }
    return bestCombo;
  }

export async function mealPlanService(user: any, id: any, days: number){
    const currentMeals = []
    const userNutrition = user.userNutrition
    const totalCalories = userNutrition.calorieTarget
    const partition = caloriePerMeal(totalCalories)
    const test = await User.findById(id)

    for (let i  = 0; i < days; i++){
        var priorMealFlag = false
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate()+i)
        const testDate = currentDate.toDateString()
        test?.mealPlan.forEach(element => {
            if(element.date === testDate){
                priorMealFlag = true
                currentMeals.push(element)
            };
        });
        if(!priorMealFlag){
            const mealBody = await dayMealPlan(user, partition, testDate)
            currentMeals.push(mealBody)
            const update = await User.findByIdAndUpdate(id, {
                $push: {mealPlan: mealBody}
                });
                await update?.save();
        }
    };
    return currentMeals
}