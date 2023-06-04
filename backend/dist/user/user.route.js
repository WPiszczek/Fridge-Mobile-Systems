"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const sessionAuthentication_1 = require("../middlewares/sessionAuthentication");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/me", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log("GET /me");
    user_controller_1.default.me(request, response);
});
exports.userRouter.get("/tags", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log("GET /tags");
    user_controller_1.default.tags(request, response);
});
exports.userRouter.get("/stats", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log("GET /stats");
    user_controller_1.default.stats(request, response);
});
