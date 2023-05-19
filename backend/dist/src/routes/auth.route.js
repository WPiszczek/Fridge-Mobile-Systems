"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/auth/login", (request, response) => {
    console.log("POST /auth/login");
    auth_controller_1.default.login(request, response);
});
exports.authRouter.post("/auth/logout", (request, response) => {
    console.log("POST /auth/logout");
    auth_controller_1.default.logout(request, response);
});
exports.authRouter.post("/auth/register", (request, response) => {
    console.log("POST /auth/register");
    auth_controller_1.default.register(request, response);
});
exports.authRouter.post("/auth/google", (request, response) => {
    console.log("POST /auth/google");
    auth_controller_1.default.loginGoogle(request, response);
});
