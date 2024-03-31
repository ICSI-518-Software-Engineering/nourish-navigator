"use strict";
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
exports.edamamApi = exports.appKey = exports.appId = void 0;
var axios_1 = __importDefault(require("axios"));
var axios_retry_1 = __importDefault(require("axios-retry"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var appId = process.env.MEAL_PLAN_API_APP_ID;
exports.appId = appId;
var appKey = process.env.MEAL_PLAN_API_APP_KEY;
exports.appKey = appKey;
var edamamApi = axios_1.default.create({
    baseURL: "https://api.edamam.com",
    params: {
        app_key: appKey,
        app_id: appId,
    },
    // headers: {
    //   "Edamam-Account-User": process.env.MEAL_PLAN_API_USER_ID,
    // },
});
exports.edamamApi = edamamApi;
(0, axios_retry_1.default)(edamamApi, {
    retries: 5,
    retryCondition: function (error) {
        var _a;
        switch ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) {
            case 429:
                return true;
            default:
                return false;
        }
    },
    retryDelay: function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        return axios_retry_1.default.exponentialDelay.apply(axios_retry_1.default, __spreadArray(__spreadArray([], arg, false), [10000], false));
    },
});
