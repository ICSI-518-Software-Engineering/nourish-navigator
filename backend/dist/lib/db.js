"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function () {
    var db = process.env.DATABASE_URL;
    mongoose_1.default
        .connect(db)
        .then(function () { return console.log("Connected to mongo db database..."); });
});
