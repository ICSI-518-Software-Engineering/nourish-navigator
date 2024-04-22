import axios from 'axios'
import User from "../models/userModel";
import { UserMealSelectionDataType, UserPreferenceMealDataType} from '../models/userDailyMealPlanModel';

async function dayMealPlan(user: any, partition: number, varDate: string){
    try {
        //Get dinner meal list
        var params = parameterSetter(user, partition, "Dinner")
        var response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params,
            paramsSerializer: {
                indexes: null // by default: false
              }
        });

        // get dinner meal list
        const dinner = await mealParser(user, partition, "Dinner");

        //get breakfast meal list
        const breakfast = await mealParser(user, partition, "Breakfast");

        //get lunch meal list
        const lunch = await mealParser(user, partition, "Lunch");
        
        const totalCalories = user.userNutrition.calorieTarget
        const totalProtein = user.userNutrition.proteinTarget
        const totalFat = user.userNutrition.fatTarget
        const totalCarbs = user.userNutrition.carbTarget
        var today: string = varDate
        const bestCombo: UserPreferenceMealDataType[] | null = findBestMealCombo(breakfast, lunch, dinner, totalCalories, totalProtein, totalFat, totalCarbs);
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

async function mealParser(user: any, partition: any, mealType: String){
    var params = parameterSetter(user, partition, mealType)
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

function parameterSetter(user: any, partition: number, type: any){
    const dietaryPreference: string[] = []
    if (user.userProfile.dietaryPreference != "" && user.userProfile.dietaryPreference != "DASH"){
        dietaryPreference.push(user.userProfile.dietaryPreference)
    }
    const medical = user.userProfile.allergies
    for (let i=0; i<medical.length; i++){
        dietaryPreference.push(medical[i]);
    }
    var params = {
        type: 'public',
        dishType: ['main course', 'sandwich'],
        app_id: process.env.EDAMAME_ID,
        app_key: process.env.EDAMAME_KEY,
        mealType: type,
        calories: `${partition-150}-${partition+150}`,
        cuisineType: user.userProfile.cuisinePreferences,
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
  
    for (let i = 0; i < breakfast.length-13; i++) {
        for (let j = 0;  j < lunch.length-13; j++) {
            for (let k = 0 ; k < dinner.length-13; k++) {
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