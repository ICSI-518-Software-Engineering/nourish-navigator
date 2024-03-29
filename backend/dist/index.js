"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./lib/db"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Intiate db
(0, db_1.default)();
// Intialise all the routes
(0, routes_1.default)(app);
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
