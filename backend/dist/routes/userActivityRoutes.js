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
    var userId, today, mealTime_1, user, todaysMealPlan_1, newMealPlan, activity, nutrientInfo, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                userId = req.params.userId;
                today = (0, moment_1.default)().format(constants_1.DEFAULTS.dateFormat);
                mealTime_1 = req.body.mealTime;
                return [4 /*yield*/, userModel_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send("Invalid User ID")];
                }
                newMealPlan = (_a = user.mealPlan) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    var _a;
                    if ((0, moment_1.default)(item.date, constants_1.DEFAULTS.dateFormat).isSame((0, moment_1.default)(), "day")) {
                        var itemClone = __assign(__assign({}, item), (_a = {}, _a[mealTime_1] = __assign(__assign({}, item[mealTime_1]), { noOfServingsConsumed: Number(req.body.consumption) }), _a));
                        todaysMealPlan_1 = __assign({}, itemClone);
                        return itemClone;
                    }
                    return item;
                });
                user.mealPlan = newMealPlan;
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, userActivity_1.default.findOne({
                        userId: userId,
                        date: today,
                    })];
            case 3:
                activity = _b.sent();
                if (!!activity) return [3 /*break*/, 5];
                return [4 /*yield*/, userActivity_1.default.create({
                        userId: userId,
                    })];
            case 4:
                activity = _b.sent();
                _b.label = 5;
            case 5:
                nutrientInfo = computeNutrientInfo(todaysMealPlan_1);
                activity.totalCalories = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalCalories;
                activity.totalFat = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalFat;
                activity.totalProtein = nutrientInfo === null || nutrientInfo === void 0 ? void 0 : nutrientInfo.totalProtein;
                return [4 /*yield*/, activity.save()];
            case 6:
                _b.sent();
                return [2 /*return*/, res.send("Activity updated successfully.")];
            case 7:
                error_1 = _b.sent();
                if (error_1 instanceof zod_1.ZodError) {
                    return [2 /*return*/, res.status(400).json(error_1.issues[0].message)];
                }
                console.log(error_1);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 8: return [2 /*return*/];
        }
    });
}); });
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
exports.default = userActivityRoutes;
/**
 * ============ Compute nutrient info ==============
 */
var computeNutrientInfo = function (mealPlanItem) {
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
    res.totalCalories =
        getCalories(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getCalories(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getCalories(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed);
    res.totalFat =
        getFat(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getFat(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getFat(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed);
    res.totalProtein =
        getProtein(breakfast, breakfast === null || breakfast === void 0 ? void 0 : breakfast.noOfServingsConsumed) +
            getProtein(lunch, lunch === null || lunch === void 0 ? void 0 : lunch.noOfServingsConsumed) +
            getProtein(dinner, dinner === null || dinner === void 0 ? void 0 : dinner.noOfServingsConsumed);
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