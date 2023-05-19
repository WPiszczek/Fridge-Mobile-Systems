"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
const express_1 = __importDefault(require("express"));
const base_controller_1 = __importDefault(require("../controllers/base.controller"));
exports.baseRouter = express_1.default.Router();
exports.baseRouter.get("/", (request, response) => {
    console.log("GET /");
    base_controller_1.default.getBaseResponse(request, response);
});
