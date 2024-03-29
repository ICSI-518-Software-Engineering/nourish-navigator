import axios from 'axios'
import { UserNutritionRequestDataType } from '../models/userNutritionModel'
import { UserProfileRequestDataType } from '../models/userProfileModel';
import { APIRecipeDataType, APIrecipeZOD } from '../models/apiRecipeModel';

async function dayMealPlan(userNutrition: UserNutritionRequestDataType, partition: number){
    const totalCalories = userNutrition.calorieTarget
    if (totalCalories != null){
    }
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
        const meals = response.data.hits.forEach((hit: any) => {
            const recipe = hit.recipe;
            console.log(`Recipe Name: ${recipe.label}`);
            console.log(`Calories: ${Math.round(recipe.calories / recipe.yield)}`);
            console.log('Ingredients:');
            recipe.ingredientLines.forEach((ingredient: string, index: number) => {
              console.log(`  ${index + 1}. ${ingredient}`);
            });
            console.log('-----------------------------------');
        });
    }
    catch{

    }
}

function caloriePerMeal(totalCalories: string){
    const partition = Math.round(parseFloat(totalCalories)/3)
    return partition
}

export function mealPlanService(userNutrition: UserNutritionRequestDataType){
    const totalCalories = userNutrition.calorieTarget
    if (totalCalories != null){
        const partition = caloriePerMeal(totalCalories)
        dayMealPlan(userNutrition, partition)
    }
}
