import axios from 'axios'
import { UserNutritionRequestDataType } from '../models/userNutritionModel'
import { UserProfileRequestDataType } from '../models/userProfileModel';

async function dayMealPlan(userNutrition: UserNutritionRequestDataType, partition: number){
    const totalCalories = userNutrition.calorieTarget
    try {
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: 'public',
                q: 'chicken',
                app_id: 'de80bcac',
                app_key: 'b780c80a7be2129a489cf65f422e8b5b',
                calories: '500-800',
            }
        });

        console.log(response.data._links)
        const meals = response.data.hits.map((hit: any) => ({
            name: hit.recipe.label,
            calories: hit.recipe.calories / hit.recipe.yield,
            image: hit.recipe.image,
            instructions: hit.recipe.url,
            protein: hit.recipe.totalNutrients.PROCNT.quantity / hit.recipe.yield,
            fat: hit.recipe.totalNutrients.FAT.quantity / hit.recipe.yield,
            carbs: hit.recipe.totalNutrients.CHOCDF.quantity / hit.recipe.yield,
            ingredients: hit.recipe.ingredients
        }));
        
        const bestCombo = findBestMealCombo(meals, totalCalories);
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

export function mealPlanService(userNutrition: UserNutritionRequestDataType){
    const totalCalories = userNutrition.calorieTarget
    if (totalCalories != null){
        const partition = caloriePerMeal(totalCalories)
        dayMealPlan(userNutrition, partition)
    }
}
