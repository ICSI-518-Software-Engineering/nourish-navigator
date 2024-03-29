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
var express_1 = require("express");
var zod_1 = require("zod");
var userModel_1 = __importDefault(require("../models/userModel"));
var userProfileModel_1 = require("../models/userProfileModel");
var nutritionCalculation_1 = require("../scripts/nutritionCalculation");
var userProfileRoutes = (0, express_1.Router)();
// profile setup api
userProfileRoutes.post("/profile/:userid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBody, nutrBody, user, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                reqBody = (0, userProfileModel_1.validateNewUserProfileRequest)(req.body);
                nutrBody = (0, nutritionCalculation_1.nutritionCalculator)(reqBody);
                return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(req.params.userid, {
                        userProfile: reqBody,
                        userNutrition: nutrBody
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send("User profile updated successfully")];
            case 3:
                ex_1 = _a.sent();
                if (ex_1 instanceof zod_1.ZodError) {
                    return [2 /*return*/, res.status(400).json(ex_1.issues[0].message)];
                }
                console.log(ex_1);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 4: return [2 /*return*/];
        }
    });
}); });
// get profile api
userProfileRoutes.get("/profile/:userid", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.params.userid)
                    return [2 /*return*/, res.status(400).send("User id is missing")];
                return [4 /*yield*/, userModel_1.default.findById(req.params.userid, {
                        password: false,
                        isAdmin: false,
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.send(user)];
            case 2:
                ex_2 = _a.sent();
                if (ex_2 instanceof zod_1.ZodError) {
                    return [2 /*return*/, res.status(400).json(ex_2.issues[0].message)];
                }
                console.log(ex_2);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get profile api
userProfileRoutes.get("/profile/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.find({ isAdmin: false }, { password: false, isAdmin: false })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.send(users)];
            case 2:
                ex_3 = _a.sent();
                console.log(ex_3);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete profile api
userProfileRoutes.delete("/profile/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.default.findByIdAndDelete(req.params.userId)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send("user deleted successfully")];
            case 2:
                ex_4 = _a.sent();
                console.log(ex_4);
                return [2 /*return*/, res.status(500).send("Unknown error occured.")];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = userProfileRoutes;
