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
exports.validateSignInRequest = exports.validateSignUpRequest = exports.signUpZodSchema = exports.signInZodSchema = exports.MongooseUserSchema = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = __importDefault(require("mongoose"));
var zod_1 = require("zod");
var userMealPlanModel_1 = require("./userMealPlanModel");
var userProfileModel_1 = require("./userProfileModel");
var userDailyMealPlanModel_1 = require("./userDailyMealPlanModel");
var userNutritionModel_1 = require("./userNutritionModel");
exports.MongooseUserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    userProfile: userProfileModel_1.MongooseUserProfileSchema,
    mealPlanProfile: userMealPlanModel_1.MongooseUserMealPlanSchema,
    mealPlan: [userDailyMealPlanModel_1.MongooseUserMealSelectionSchema],
    userNutrition: userNutritionModel_1.MongooseUserNutritionSchema
});
exports.MongooseUserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var thisObj, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thisObj = this;
                    if (!this.isModified("password")) {
                        return [2 /*return*/, next()];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = thisObj;
                    return [4 /*yield*/, bcryptjs_1.default.hash(thisObj.password, 10)];
                case 2:
                    _a.password = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, next(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
});
exports.MongooseUserSchema.methods.validatePassword = function (password) {
    return bcryptjs_1.default.compareSync(password, this.password);
};
exports.MongooseUserSchema.methods.generateAuthToken = function () {
    var token = jsonwebtoken_1.default.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
    }, process.env.JWT_PRIVATE_KEY);
    return token;
};
exports.signInZodSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email is required" }).email(),
    password: zod_1.z.string({ required_error: "Password is required" }),
});
exports.signUpZodSchema = exports.signInZodSchema.extend({
    name: zod_1.z.string({ required_error: "Name is required" }),
    isAdmin: zod_1.z.boolean().optional(),
});
// Custom Validator
var validateSignUpRequest = function (body) {
    var res = exports.signUpZodSchema.parse(body);
    return res;
};
exports.validateSignUpRequest = validateSignUpRequest;
var validateSignInRequest = function (body) {
    var res = exports.signInZodSchema.parse(body);
    return res;
};
exports.validateSignInRequest = validateSignInRequest;
var User = mongoose_1.default.model("user", exports.MongooseUserSchema);
exports.default = User;
