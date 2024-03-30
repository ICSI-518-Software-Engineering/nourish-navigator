"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userProfileRoutes_1 = __importDefault(require("./userProfileRoutes"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
function default_1(app) {
    app.use("/api/auth", userRoutes_1.default);
    app.use("/api/user", userProfileRoutes_1.default);
}
exports.default = default_1;
