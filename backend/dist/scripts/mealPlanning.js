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
        var totalCalories, today, response, meals, bestCombo, mealPlan, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    totalCalories = user.userNutrition.calorieTarget;
                    today = varDate;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('https://api.edamam.com/api/recipes/v2', {
                            params: {
                                type: 'public',
                                dishType: 'main course',
                                app_id: process.env.EDAMAME_ID,
                                app_key: process.env.EDAMAME_KEY,
                                calories: "".concat(partition - 150, "-").concat(partition + 150),
                                cuisineType: user.userProfile.cuisinePreferences,
                                health: user.userProfile.dietaryPreference.concat(user.userProfile.allergies)
                            }
                        })];
                case 2:
                    response = _b.sent();
                    meals = response.data.hits.map(function (hit) { return ({
                        mealName: hit.recipe.label,
                        calories: hit.recipe.calories / hit.recipe.yield,
                        image: hit.recipe.image,
                        instructions: hit.recipe.url,
                        protein: hit.recipe.totalNutrients.PROCNT.quantity / hit.recipe.yield,
                        fat: hit.recipe.totalNutrients.FAT.quantity / hit.recipe.yield,
                        carbs: hit.recipe.totalNutrients.CHOCDF.quantity / hit.recipe.yield,
                        //ingredients: hit.recipe.ingredients
                    }); });
                    bestCombo = findBestMealCombo(meals, totalCalories);
                    if (bestCombo != null) {
                        mealPlan = {
                            date: today,
                            meal: bestCombo
                        };
                        return [2 /*return*/, mealPlan];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function caloriePerMeal(totalCalories) {
    var partition = Math.round(parseFloat(totalCalories) / 3);
    return partition;
}
function findBestMealCombo(meals, targetCalories) {
    var target = parseFloat(targetCalories);
    var bestCombo = null;
    var closestDiff = Infinity;
    for (var i = 0; i < meals.length; i++) {
        for (var j = i + 1; j < meals.length; j++) {
            for (var k = j + 1; k < meals.length; k++) {
                var comboCalories = meals[i].calories + meals[j].calories + meals[k].calories;
                var diff = Math.abs(target - comboCalories);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestCombo = [meals[i], meals[j], meals[k]];
                }
            }
        }
    }
    return bestCombo;
}
function mealPlanService(user, id) {
    return __awaiter(this, void 0, void 0, function () {
        var today, testToday, tomorrow, testTomorrow, todayFlag, tomorrowFlag, test, userNutrition, totalCalories, partition, mealBody, update, partition, mealBody, update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date();
                    testToday = today.toDateString();
                    tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    testTomorrow = tomorrow.toDateString();
                    todayFlag = false;
                    tomorrowFlag = false;
                    return [4 /*yield*/, userModel_1.default.findById(id)];
                case 1:
                    test = _a.sent();
                    test === null || test === void 0 ? void 0 : test.mealPlan.forEach(function (element) {
                        if (element.date === testToday) {
                            todayFlag = true;
                        }
                        if (element.date === testTomorrow) {
                            tomorrowFlag = true;
                        }
                    });
                    userNutrition = user.userNutrition;
                    totalCalories = userNutrition.calorieTarget;
                    if (!(totalCalories != null)) return [3 /*break*/, 9];
                    if (!!todayFlag) return [3 /*break*/, 5];
                    partition = caloriePerMeal(totalCalories);
                    return [4 /*yield*/, dayMealPlan(user, partition, testToday)];
                case 2:
                    mealBody = _a.sent();
                    return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, {
                            $push: { mealPlan: mealBody }
                        })];
                case 3:
                    update = _a.sent();
                    return [4 /*yield*/, (update === null || update === void 0 ? void 0 : update.save())];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!!tomorrowFlag) return [3 /*break*/, 9];
                    partition = caloriePerMeal(totalCalories);
                    return [4 /*yield*/, dayMealPlan(user, partition, testTomorrow)];
                case 6:
                    mealBody = _a.sent();
                    return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(id, {
                            $push: { mealPlan: mealBody }
                        })];
                case 7:
                    update = _a.sent();
                    return [4 /*yield*/, (update === null || update === void 0 ? void 0 : update.save())];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.mealPlanService = mealPlanService;
