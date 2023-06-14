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
const stats = async (request, response) => {
    const userId = request.session.userId;
    const numberOfDays = parseInt(request.params.numberOfDays ?? 30);
    if (!userId) {
        response.status(401).json({
            status: "FAIL",
            message: "Log in to continue."
        });
        return;
    }
    await user_service_1.default.getUserStats(userId, numberOfDays).then((result) => {
        const [success, statsData] = result;
        if (success) {
            response.status(200).json({
                status: "SUCCESS",
                data: statsData
            });
        }
        else {
            response.status(500).json({
                status: "FAIL",
                message: "Error while getting stats. Try again."
            });
        }
    });
};
const tags = async (request, response) => {
    const userId = request.session.userId;
    if (!userId) {
        response.status(401).json({
            status: "FAIL",
            message: "Log in to continue."
        });
        return;
    }
    await user_service_1.default.getTags(userId).then((result) => {
        const [success, tagsData] = result;
        if (success) {
            response.status(200).json({
                status: "SUCCESS",
                data: tagsData
            });
        }
        else {
            response.status(500).json({
                status: "FAIL",
                message: "Error while getting tags. Try again."
            });
        }
    });
};
exports.default = {
    me,
    stats,
    tags
};
