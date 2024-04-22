import { UserNutritionRequestDataType } from "../models/userNutritionModel";
import { UserProfileRequestDataType } from "../models/userProfileModel";

const proteinRatio = 0.35;
const fatRatio = 0.35;
const carbRatio = 0.3;

export function nutritionCalculator(user: UserProfileRequestDataType){
    var calories = calorieCalculation(user);

    var result: UserNutritionRequestDataType = {
        calorieTarget: calories,
        proteinTarget: proteinMacrohelper(calories),
        fatTarget: fatMacrohelper(calories),
        carbTarget: carbMacrohelper(calories)
    };

    return result
}

function calorieCalculation(user: UserProfileRequestDataType){
    switch (user.gender){
      case "male": {
        var genderOffset = 88.362;
        var weightOffset = 13.397;
        var ageOffset = 5.677;
        var heightOffset = 4.799
        var minCals = 1500;
        break;
      }
      case "female": {
        var genderOffset = 447.593;
        var weightOffset = 9.247;
        var ageOffset = 4.330
        var heightOffset = 3.098
        var minCals = 1200;
        break;
      }
      default: {
        var genderOffset = 5;
        var weightOffset = 13.397;
        var ageOffset = 5.677;
        var heightOffset = 4.799
        var minCals = 1500;
      }
    }

    var target = weightOffset*parseFloat(user.weight) + 30.48*heightOffset*parseFloat(user.height)
     - ageOffset*parseFloat(user.age) + genderOffset;
    target = target*1.2 - 500;
    if (target < minCals){
        target = minCals;
    }

    return target.toString()
};

function proteinMacrohelper(calories: string){
    return Math.round(parseFloat(calories)*proteinRatio/4).toString()
};

function fatMacrohelper(calories: string){
    return Math.round(parseFloat(calories)*fatRatio/9).toString()
};

function carbMacrohelper(calories: string){
    return Math.round(parseFloat(calories)*carbRatio/4).toString()
};