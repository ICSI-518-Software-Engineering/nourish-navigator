"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edamamApiUtils = void 0;
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var appId = process.env.MEAL_PLAN_API_APP_ID;
var appKey = process.env.MEAL_PLAN_API_APP_KEY;
var edamamApi = axios_1.default.create({
    baseURL: "https://api.edamam.com/api",
    params: {
        app_key: appKey,
        app_id: appId,
    },
    // headers: {
    //   "Edamam-Account-User": process.env.MEAL_PLAN_API_USER_ID,
    // },
});
exports.edamamApiUtils = {
    edamamApi: edamamApi,
    appId: appId,
    appKey: appKey,
};
