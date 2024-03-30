import axios from 'axios'
import User from "../models/userModel";
import { UserMealSelectionDataType, UserPreferenceMealDataType} from '../models/userDailyMealPlanModel';

async function dayMealPlan(user: any, partition: number, varDate: string){

    //console.log(user.userProfile.dietaryPreference.concat(user.userProfile.allergies))
    try {
        const params = parameterSetter(user, partition)
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
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
            //ingredients: hit.recipe.ingredients
        }));
        
        const totalCalories = user.userNutrition.calorieTarget
        const totalProtein = user.userNutrition.proteinTarget
        const totalFat = user.userNutrition.fatTarget
        const totalCarbs = user.userNutrition.carbTarget
        var today: string = varDate
        const bestCombo: UserPreferenceMealDataType[] | null = findBestMealCombo(meals, totalCalories, totalProtein, totalFat, totalCarbs);

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

function parameterSetter(user: any, partition: number){
    var params = {
        type: 'public',
        dishType: ['main course', 'sandwich'],
        app_id: process.env.EDAMAME_ID,
        app_key: process.env.EDAMAME_KEY,
        calories: `${partition-150}-${partition+150}`,
        cuisineType: user.userProfile.cuisinePreferences,
        random: 'true',
        health: [],
    }
    const dietaryPreference = []
    dietaryPreference.push(user.userProfile.dietaryPreference)
    const medical = user.userProfile.allergies.concat(dietaryPreference)
    if (medical[0] != ''){
        params.health = medical
    }

    return params
}

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
                const diff = Math.abs(targetCal - comboCalories) + 20*Math.abs(targetP-comboProtein) + 8*Math.abs(targetF-comboFat)+ 5*Math.abs(targetC-comboCarbs);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestCombo = [meals[i], meals[j], meals[k]];
                }
            }
        }
    }
    return bestCombo;
  }

export async function mealPlanService(user: any, id: any, days: number){
    var currentMeals = []
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