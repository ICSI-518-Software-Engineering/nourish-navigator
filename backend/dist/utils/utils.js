"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var sleep = function (duration) {
    if (duration === void 0) { duration = 5000; }
    return new Promise(function (resolve) { return setTimeout(resolve, duration); });
};
exports.sleep = sleep;
