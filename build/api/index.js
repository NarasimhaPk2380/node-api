"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var books_1 = __importDefault(require("./routes/books"));
var users_1 = __importDefault(require("./routes/users"));
exports.default = (function () {
    var app = express_1.Router();
    books_1.default(app);
    users_1.default(app);
    return app;
});
