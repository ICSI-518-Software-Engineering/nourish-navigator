"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealPlanService = void 0;
var axios_1 = __importDefault(require("axios"));
var userModel_1 = __importDefault(require("../models/userModel"));
function dayMealPlan(user, partition, varDate) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, dinner, response2, breakfast, response3, lunch, totalCalories, totalProtein, totalFat, totalCarbs, today, bestCombo, mealPlan, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    params = parameterSetter(user, partition, "Dinner");
                    console.log(params);
                    return [4 /*yield*/, axios_1.default.get('https://api.edamam.com/api/recipes/v2', {
                            params: params,
                            paramsSerializer: {
                                indexes: null // by default: false
                            }
                        })];
                case 1:
                    response = _a.sent();
                    dinner = mealParser(response);
                    params = parameterSetter(user, partition, "Breakfast");
                    return [4 /*yield*/, axios_1.default.get('https://api.edamam.com/api/recipes/v2', {
                            params: params,
                            paramsSerializer: {
                                indexes: null // by default: false
                            }
                        })];
                case 2:
                    response2 = _a.sent();
                    breakfast = mealParser(response2);
                    params = parameterSetter(user, partition, "Lunch");
                    return [4 /*yield*/, axios_1.default.get('https://api.edamam.com/api/recipes/v2', {
                            params: params,
                            paramsSerializer: {
                                indexes: null // by default: false
                            }
                        })];
                case 3:
                    response3 = _a.sent();
                    lunch = mealParser(response3);
                    totalCalories = user.userNutrition.calorieTarget;
                    totalProtein = user.userNutrition.proteinTarget;
                    totalFat = user.userNutrition.fatTarget;
                    totalCarbs = user.userNutrition.carbTarget;
                    today = varDate;
                    bestCombo = findBestMealCombo(breakfast, lunch, dinner, totalCalories, totalProtein, totalFat, totalCarbs);
                    if (bestCombo != null) {
                        mealPlan = {
                            date: today,
                            meal: bestCombo
                        };
                        return [2 /*return*/, mealPlan];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function mealParser(response) {
    var meals = response.data.hits.map(function (hit) { return ({
        mealName: hit.recipe.label,
        calories: hit.recipe.calories / hit.recipe.yield,
        image: hit.recipe.image,
        instructions: hit.recipe.url,
        protein: hit.recipe.totalNutrients.PROCNT.quantity / hit.recipe.yield,
        fat: hit.recipe.totalNutrients.FAT.quantity / hit.recipe.yield,
        carbs: hit.recipe.totalNutrients.CHOCDF.quantity / hit.recipe.yield,
    }); });
    return meals;
}
function parameterSetter(user, partition, type) {
    var dietaryPreference = [];
    if (user.userProfile.dietaryPreference != "" && user.userProfile.dietaryPreference != "DASH") {
        dietaryPreference.push(user.userProfile.dietaryPreference);
    }
    var medical = user.userProfile.allergies;
    for (var i = 0; i < medical.length; i++) {
        dietaryPreference.push(medical[i]);
    }
    var params = {
        type: 'public',
        dishType: ['main course', 'sandwich'],
        app_id: process.env.EDAMAME_ID,
        app_key: process.env.EDAMAME_KEY,
        mealType: type,
        calories: "".concat(partition - 150, "-").concat(partition + 150),
        cuisineType: user.userProfile.cuisinePreferences,
        random: 'true',
        health: dietaryPreference,
    };
    return params;
}
function caloriePerMeal(totalCalories) {
    var partition = Math.round(parseFloat(totalCalories) / 3);
    return partition;
}
function findBestMealCombo(breakfast, lunch, dinner, targetCalories, targetProtein, targetFat, targetCarbs) {
    var targetCal = parseFloat(targetCalories);
    var targetP = parseFloat(targetProtein);
    var targetF = parseFloat(targetFat);
    var targetC = parseFloat(targetCarbs);
    var bestCombo = null;
    var closestDiff = Infinity;
    for (var i = 0; i < breakfast.length - 13; i++) {
        for (var j = 0; j < lunch.length - 13; j++) {
            for (var k = 0; k < dinner.length - 13; k++) {
                var comboCalories = breakfast[i].calories + lunch[j].calories + dinner[k].calories;
                var comboProtein = breakfast[i].protein + lunch[j].protein + dinner[k].protein;
                var comboFat = breakfast[i].fat + lunch[j].fat + dinner[k].fat;
                var comboCarbs = breakfast[i].carbs + lunch[j].carbs + dinner[k].carbs;
                var diff = Math.abs(targetCal - comboCalories) + 20 * Math.abs(targetP - comboProtein) + 8 * Math.abs(targetF - comboFat) + 5 * Math.abs(targetC - comboCarbs);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestCombo = [breakfast[i], lunch[j], dinner[k]];
                }
            }
        }
    }
    return bestCombo;
}
function mealPlanService(user, id, days) {
    return __awaiter(this, void 0, void 0, function () {
        var currentMeals, userNutrition, totalCalories, partition, test, _loop_1, priorMealFlag, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentMeals = [];
                    userNutrition = user.userNutrition;
                    totalCalories = userNutrition.calorieTarget;
                    partition = caloriePerMeal(totalCalories);
                    return [4 /*yield*/, userModel_1.default.findById(id)];
                case 1:
                    test = _a.sent();
                    _loop_1 = function (i) {
                        var currentDate, testDate, mealBody, update;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    priorMealFlag = false;
                                    currentDate = new Date();
                                    currentDate.setDate(currentDate.getDate() + i);
                                    testDate = currentDate.toDateString();
                                    test === null || test === void 0 ? void 0 : test.mealPlan.forEach(function (element) {
                                        if (element.date === testDate) {
                                            priorMealFlag = true;
                                            currentMeals.push(element);
                                        }
                                        ;
                                    });
                                    if (!!priorMealFlag) return [3 /*break*/, 4];
                                    return [4 /*yield*/, dayMealPlan(user, partition, testDate)];
                                case 1:
                                    mealBody = _b.sent();
                                    currentMeals.push(mealBody);
                                    return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, {
                                            $push: { mealPlan: mealBody }
                                        })];
                                case 2:
                                    update = _b.sent();
                                    return [4 /*yield*/, (update === null || update === void 0 ? void 0 : update.save())];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < days)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    ;
                    return [2 /*return*/, currentMeals];
            }
        });
    });
}
exports.mealPlanService = mealPlanService;
