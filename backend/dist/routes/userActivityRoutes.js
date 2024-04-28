"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var moment_1 = __importDefault(require("moment"));
var zod_1 = require("zod");
var constants_1 = require("../lib/constants");
var userActivity_1 = __importDefault(require("../models/userActivity"));
var userModel_1 = __importDefault(require("../models/userModel"));
var userActivityRoutes = (0, express_1.Router)();
userActivityRoutes.post("/:userId?", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, today, mealTime_1, user, todaysMealPlan_1, newMealPlan, activity, nutrientInfo, previousWeight, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                userId = req.params.userId;
                today = (0, moment_1.default)().format(constants_1.DEFAULTS.dateFormat);
                mealTime_1 = req.body.mealTime;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send("Invalid User ID")];
                }
                newMealPlan = (_a = user.mealPlan) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    var _a;
                    var _b, _c, _d;
                    if ((0, moment_1.default)(item.date, constants_1.DEFAULTS.dateFormat).isSame((0, moment_1.default)(), "day")) {
                        var itemClone = __assign({}, item);
                        if (mealTime_1 === "other") {
                            var otherRecipeIdx = (_b = item === null || item === void 0 ? void 0 : item.other) === null || _b === void 0 ? void 0 : _b.findIndex(function (i) {
                                var _a;
                                return i.uri ===
                                    ((_a = req.body.recipe) === null || _a === void 0 ? void 0 : _a.uri);
                            });
                            var otherRecipe = (_c = item === null || item === void 0 ? void 0 : item.other) === null || _c === void 0 ? void 0 : _c[otherRecipeIdx];
                            var updatedOtherRecipes = __spreadArray([], item === null || item === void 0 ? void 0 : item.other, true);
                            updatedOtherRecipes[otherRecipeIdx] = __assign(__assign({}, otherRecipe), { noOfServingsConsumed: Number(req.body.consumption) });
                            itemClone = __assign(__assign({}, item), { other: updatedOtherRecipes });
                        }
                        else {
                            itemClone = __assign(__assign({}, item), (_a = {}, _a[mealTime_1] = (_d = req.body.recipe) !== null && _d !== void 0 ? _d : __assign(__assign({}, item[mealTime_1]), { noOfServingsConsumed: Number(req.body.consumption) }), _a));
                        }
                        todaysMealPlan_1 = __assign({}, itemClone);
                        return itemClone;
                    }
                    return item;
                });
                user.mealPlan = newMealPlan;
                return [4 /*yield*/, user.save()];
            case 2:
                _c.sent();
                return [4 /*yield*/, userActivity_1.default.findOne({
                        userId: userId,
                        date: today,
                    })];
            case 3:
                activity = _c.sent();
                if (!!activity) return [3 /*break*/, 5];
                return [4 /*yield*/, userActivity_1.default.create({
                        userId: userId,
                    })];
            case 4:
                activity = _c.sent();
                _c.label = 5;
            case 5:
                nutrientInfo = computeNutrientInfo(todaysMealPlan_1);
                activity.totalCalories = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalCalories;
                activity.totalFat = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalFat;
                activity.totalProtein = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalProtein;
                if (!!activity.currentWeight) return [3 /*break*/, 7];
                return [4 /*yield*/, userActivity_1.default.findOne({
                        userId: userId,
                        currentWeight: {
                            $ne: null,
                        },
                    }, { currentWeight: true }).sort("-createdAt")];
            case 6:
                previousWeight = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.currentWeight;
                if (previousWeight) {
                    activity.currentWeight = previousWeight;
                }
                _c.label = 7;
            case 7: return [4 /*yield*/, activity.save()];
            case 8:
                _c.sent();
                return [2 /*return*/, res.send("Activity updated successfully.")];
            case 9:
                error_1 = _c.sent();
                if (error_1 instanceof zod_1.ZodError) {
                    return [2 /*return*/, res.status(400).json(error_1.issues[0].message)];
                }
                console.log(error_1);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 10: return [2 /*return*/];
        }
    });
}); });
/**
 * Get User Activity API
 */
userActivityRoutes.get("/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, activity, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                if (!userId)
                    return [2 /*return*/, res.status(400).send("User ID is required")];
                return [4 /*yield*/, userActivity_1.default.find({
                        userId: userId,
                    })];
            case 1:
                activity = _a.sent();
                return [2 /*return*/, res.json(activity)];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Current Weight API
 */
userActivityRoutes.post("/current-weight/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, today, activity, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userId = req.params.userId;
                today = (0, moment_1.default)().format(constants_1.DEFAULTS.dateFormat);
                if (!userId)
                    return [2 /*return*/, res.status(400).send("User ID is required")];
                return [4 /*yield*/, userActivity_1.default.findOne({
                        userId: userId,
                        date: today,
                    })];
            case 1:
                activity = _a.sent();
                if (!!activity) return [3 /*break*/, 3];
                return [4 /*yield*/, userActivity_1.default.create({
                        userId: userId,
                    })];
            case 2:
                activity = _a.sent();
                _a.label = 3;
            case 3:
                activity.currentWeight = req.body.weight;
                return [4 /*yield*/, activity.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json(activity)];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * Add Recipe API
 */
userActivityRoutes.post("/add-other-recipe/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, todaysMealPlanIdx, todaysMealPlan, error_4;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                if (!userId)
                    return [2 /*return*/, res.status(400).send("User ID is required")];
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _e.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send("No user found!!!")];
                }
                todaysMealPlanIdx = (_b = (_a = user.mealPlan) === null || _a === void 0 ? void 0 : _a.findIndex) === null || _b === void 0 ? void 0 : _b.call(_a, function (t) {
                    return (0, moment_1.default)(t.date, constants_1.DEFAULTS.dateFormat).isSame((0, moment_1.default)(), "day");
                });
                if (todaysMealPlanIdx === -1) {
                    return [2 /*return*/, res.status(400).send("No meal plan found...")];
                }
                todaysMealPlan = user.mealPlan[todaysMealPlanIdx];
                if (todaysMealPlan.other instanceof Array) {
                    (_d = (_c = todaysMealPlan.other).push) === null || _d === void 0 ? void 0 : _d.call(_c, req.body);
                }
                else {
                    todaysMealPlan.other = [req.body];
                }
                user.mealPlan[todaysMealPlanIdx] = __assign({}, todaysMealPlan);
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, user)];
            case 2:
                _e.sent();
                return [2 /*return*/, res.send("Addition of recipe to today's meal plan is successful.")];
            case 3:
                error_4 = _e.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * Remove recipe API
 */
userActivityRoutes.delete("/remove-other-recipe/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, recipeUri_1, user, todaysMealPlanIdx, todaysMealPlan, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                recipeUri_1 = req.query.recipeUri;
                if (!userId)
                    return [2 /*return*/, res.status(400).send("User ID is required")];
                if (!recipeUri_1)
                    return [2 /*return*/, res.status(400).send("Recipe URI is required")];
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send("No user found!!!")];
                }
                todaysMealPlanIdx = (_b = (_a = user.mealPlan) === null || _a === void 0 ? void 0 : _a.findIndex) === null || _b === void 0 ? void 0 : _b.call(_a, function (t) {
                    return (0, moment_1.default)(t.date, constants_1.DEFAULTS.dateFormat).isSame((0, moment_1.default)(), "day");
                });
                if (todaysMealPlanIdx === -1) {
                    return [2 /*return*/, res.status(400).send("No meal plan found...")];
                }
                todaysMealPlan = user.mealPlan[todaysMealPlanIdx];
                if (todaysMealPlan.other instanceof Array) {
                    todaysMealPlan.other = todaysMealPlan.other.filter(function (i) { return i.uri !== recipeUri_1; });
                }
                else {
                    todaysMealPlan.other = [];
                }
                console.log(todaysMealPlan.other);
                user.mealPlan[todaysMealPlanIdx] = __assign({}, todaysMealPlan);
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, user)];
            case 2:
                _c.sent();
                return [2 /*return*/, res.send("Removal of recipe from today's meal plan is successful.")];
            case 3:
                error_5 = _c.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = userActivityRoutes;
/**
 * ============ Compute nutrient info ==============
 */
var computeNutrientInfo = function (mealPlanItem) {
    var _a, _b, _c;
    var res = {
        totalCalories: 0,
        totalFat: 0,
        totalProtein: 0,
    };
    if (!mealPlanItem)
        return res;
    var breakfast = mealPlanItem.breakfast;
    var lunch = mealPlanItem.lunch;
    var dinner = mealPlanItem.dinner;
    var others = mealPlanItem.other;
    res.totalCalories =
        getCalories(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getCalories(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getCalories(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed) +
            ((_a = others === null || others === void 0 ? void 0 : others.reduce(function (total, recipe) {
                total += getCalories(recipe, recipe === null || recipe === void 0 ? void 0 : recipe.noOfServingsConsumed);
                return total;
            }, 0)) !== null && _a !== void 0 ? _a : 0);
    res.totalFat =
        getFat(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getFat(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getFat(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed) +
            ((_b = others === null || others === void 0 ? void 0 : others.reduce(function (total, recipe) {
                total += getFat(recipe, recipe === null || recipe === void 0 ? void 0 : recipe.noOfServingsConsumed);
                return total;
            }, 0)) !== null && _b !== void 0 ? _b : 0);
    res.totalProtein =
        getProtein(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getProtein(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getProtein(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed) +
            ((_c = others === null || others === void 0 ? void 0 : others.reduce(function (total, recipe) {
                total += getProtein(recipe, recipe === null || recipe === void 0 ? void 0 : recipe.noOfServingsConsumed);
                return total;
            }, 0)) !== null && _c !== void 0 ? _c : 0);
    return res;
};
var getCalories = function (recipeItem, consumption) {
    var _a, _b, _c;
    if (consumption === void 0) { consumption = 0; }
    if (!recipeItem)
        return 0;
    var totalCals = Number((_c = (_b = (_a = recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.totalNutrients) === null || _a === void 0 ? void 0 : _a.ENERC_KCAL) === null || _b === void 0 ? void 0 : _b.quantity) !== null && _c !== void 0 ? _c : 0);
    var res = (totalCals / Number(recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.yield)) * Number(consumption);
    return res;
};
var getFat = function (recipeItem, consumption) {
    var _a, _b, _c;
    if (consumption === void 0) { consumption = 0; }
    if (!recipeItem)
        return 0;
    var totalFat = Number((_c = (_b = (_a = recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.totalNutrients) === null || _a === void 0 ? void 0 : _a.FAT) === null || _b === void 0 ? void 0 : _b.quantity) !== null && _c !== void 0 ? _c : 0);
    var res = (totalFat / Number(recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.yield)) * Number(consumption);
    return res;
};
var getProtein = function (recipeItem, consumption) {
    var _a, _b, _c;
    if (consumption === void 0) { consumption = 0; }
    if (!recipeItem)
        return 0;
    var totalProtein = Number((_c = (_b = (_a = recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.totalNutrients) === null || _a === void 0 ? void 0 : _a.PROCNT) === null || _b === void 0 ? void 0 : _b.quantity) !== null && _c !== void 0 ? _c : 0);
    var res = (totalProtein / Number(recipeItem === null || recipeItem === void 0 ? void 0 : recipeItem.yield)) * Number(consumption);
    return res;
};
