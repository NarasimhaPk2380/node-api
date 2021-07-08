"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validation_schema_1 = require("../../helpers/validation_schema");
var users_controller_1 = __importDefault(require("../controllers/users.controller"));
var auth_1 = require("../middlewares/auth");
var router = express_1.Router();
exports.default = (function (app) {
    app.use("/oktauser", router);
    router.post("/register", auth_1.joiValidation(validation_schema_1.regiserUserSchema), users_controller_1.default.registerOktaUser);
    router.post("/login", auth_1.joiValidation(validation_schema_1.loginUserSchema), users_controller_1.default.loginOktaUser);
});
