"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = __importDefault(require("./base.service"));
const getBaseResponse = async (request, response) => {
    const responseString = base_service_1.default.getFromService();
    response.status(200).send(responseString);
};
exports.default = {
    getBaseResponse
};
