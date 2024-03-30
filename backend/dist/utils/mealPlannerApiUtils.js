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
exports.generateMealPlan = void 0;
var axios_1 = __importDefault(require("axios"));
var appId = process.env.MEAL_PLAN_API_APP_ID;
var appKey = process.env.MEAL_PLAN_API_APP_KEY;
var http = axios_1.default.create({
    baseURL: "https://api.edamam.com/api",
    params: {
        app_key: appKey,
        app_id: appId,
    },
});
// edamam api is being used for meal planning
var KEYS = {
    breakfast: "breakfast",
    lunch: "lunch",
    dinner: "dinner",
};
var prepareMealPlanApiRequest = function (user) {
    var mealPlanProfile = user.mealPlanProfile;
    var mealTimings = new Set(mealPlanProfile.mealsTimings);
    var sections = {};
    //   Breakfast
    if (mealTimings.has(KEYS.breakfast)) {
        sections.Breakfast = {
            accept: {
                all: [
                    {
                        dish: mealPlanProfile.mealCategories,
                    },
                    { meal: [KEYS.breakfast] },
                ],
            },
        };
    }
    //   Lunch
    if (mealTimings.has(KEYS.lunch)) {
        sections.Lunch = {
            accept: {
                all: [
                    {
                        dish: mealPlanProfile.mealCategories,
                    },
                    { meal: ["".concat(KEYS.lunch, "/").concat(KEYS.dinner)] },
                ],
            },
        };
    }
    //   Dinner
    if (mealTimings.has(KEYS.dinner)) {
        sections.Dinner = {
            accept: {
                all: [
                    {
                        dish: mealPlanProfile.mealCategories,
                    },
                    { meal: ["".concat(KEYS.lunch, "/").concat(KEYS.dinner)] },
                ],
            },
        };
    }
    return {
        size: parseInt(mealPlanProfile.noOfDays),
        plan: {
            accept: {
                all: [
                // {
                //     "health" : userProfile.allergies
                // },
                // {
                //     diet: userProfile.dietaryPreference
                // }
                ],
            },
            fit: {
                ENERC_KCAL: {
                    min: parseInt(mealPlanProfile.minCaloriesPerDay),
                    max: parseInt(mealPlanProfile.maxCaloriesPerDay),
                },
            },
            sections: sections,
        },
    };
};
var getRecipeDetails = function (apiUrl) {
    return http.get("/recipes/v2/by-uri", {
        params: {
            type: "public",
            uri: apiUrl,
            app_id: appId,
            app_key: appKey,
        },
    });
};
var generateMealPlan = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, res, mealPlan, recipePromises, selections, recipesResponsesMap_1, resolvedRecipePromises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqBody = prepareMealPlanApiRequest(user);
                return [4 /*yield*/, http.post("meal-planner/v1/".concat(appId, "/select"), reqBody)];
            case 1:
                res = _a.sent();
                mealPlan = [];
                recipePromises = [];
                if (!(res && res.data)) return [3 /*break*/, 3];
                selections = res.data.selection;
                if (!selections) return [3 /*break*/, 3];
                // Restructuring data
                selections.forEach(function (selection) {
                    var resultObj = {};
                    var _a = selection.sections, Breakfast = _a.Breakfast, Dinner = _a.Dinner, Lunch = _a.Lunch;
                    if (Breakfast) {
                        resultObj[KEYS.breakfast] = Breakfast.assigned;
                        recipePromises.push(getRecipeDetails(Breakfast.assigned));
                    }
                    if (Dinner) {
                        resultObj[KEYS.dinner] = Dinner.assigned;
                        recipePromises.push(getRecipeDetails(Dinner.assigned));
                    }
                    if (Lunch) {
                        resultObj[KEYS.lunch] = Lunch.assigned;
                        recipePromises.push(getRecipeDetails(Lunch.assigned));
                    }
                    mealPlan.push(resultObj);
                });
                recipesResponsesMap_1 = {};
                return [4 /*yield*/, Promise.all(recipePromises)];
            case 2:
                resolvedRecipePromises = _a.sent();
                resolvedRecipePromises.forEach(function (item) {
                    var _a, _b, _c;
                    var recipeData = (_c = (_b = (_a = item.data) === null || _a === void 0 ? void 0 : _a.hits) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.recipe;
                    var uri = recipeData === null || recipeData === void 0 ? void 0 : recipeData.uri;
                    if (uri) {
                        recipesResponsesMap_1[uri] = recipeData;
                    }
                });
                // Updating meal plan object
                mealPlan.forEach(function (item) {
                    var breakfast = item.breakfast, lunch = item.lunch, dinner = item.dinner;
                    if (breakfast) {
                        item.breakfast = recipesResponsesMap_1[breakfast];
                    }
                    if (lunch) {
                        item.lunch = recipesResponsesMap_1[lunch];
                    }
                    if (dinner) {
                        item.dinner = recipesResponsesMap_1[dinner];
                    }
                });
                _a.label = 3;
            case 3: return [2 /*return*/, mealPlan];
        }
    });
}); };
exports.generateMealPlan = generateMealPlan;
