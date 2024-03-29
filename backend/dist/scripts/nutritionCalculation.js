"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nutritionCalculator = void 0;
var proteinRatio = 0.35;
var fatRatio = 0.35;
var carbRatio = 0.3;
function nutritionCalculator(user) {
    var calories = calorieCalculation(user);
    var result = {
        calorieTarget: calories,
        proteinTarget: proteinMacrohelper(calories),
        fatTarget: fatMacrohelper(calories),
        carbTarget: carbMacrohelper(calories)
    };
    return result;
}
exports.nutritionCalculator = nutritionCalculator;
function calorieCalculation(user) {
    switch (user.gender) {
        case "male": {
            var genderOffset = 88.362;
            var weightOffset = 13.397;
            var ageOffset = 5.677;
            var heightOffset = 4.799;
            var minCals = 1500;
            break;
        }
        case "female": {
            var genderOffset = 447.593;
            var weightOffset = 9.247;
            var ageOffset = 4.330;
            var heightOffset = 3.098;
            var minCals = 1200;
            break;
        }
        default: {
            var genderOffset = 5;
            var weightOffset = 13.397;
            var ageOffset = 5.677;
            var heightOffset = 4.799;
            var minCals = 1500;
        }
    }
    var target = weightOffset * parseFloat(user.weight) + 30.48 * heightOffset * parseFloat(user.height)
        - ageOffset * parseFloat(user.age) + genderOffset;
    if (target < minCals) {
        target = minCals;
    }
    return target.toString();
}
;
function proteinMacrohelper(calories) {
    return Math.round(parseFloat(calories) * proteinRatio / 4).toString();
}
;
function fatMacrohelper(calories) {
    return Math.round(parseFloat(calories) * fatRatio / 9).toString();
}
;
function carbMacrohelper(calories) {
    return Math.round(parseFloat(calories) * carbRatio / 4).toString();
}
;
