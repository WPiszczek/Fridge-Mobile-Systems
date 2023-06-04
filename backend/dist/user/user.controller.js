"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const me = async (request, response) => {
    const userId = request.session.userId;
    if (!userId) {
        response.status(401).json({
            status: "FAIL",
            message: "Log in to continue."
        });
        return;
    }
    await user_service_1.default.getUser(userId).then((result) => {
        const [success, userData] = result;
        if (success) {
            response.status(200).json({
                status: "SUCCESS",
                data: userData
            });
        }
        else {
            response.status(500).json({
                status: "FAIL",
                message: "Error while getting user. Try again."
            });
        }
    });
};
// TODO
const stats = async (request, response) => { };
exports.default = {
    me,
    stats
};
