"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const me = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.session.userId;
    if (!userId) {
        response.status(401).json({
            status: "FAIL",
            message: "Log in to continue."
        });
        return;
    }
    yield user_service_1.default.getUser(userId).then((result) => {
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
});
// TODO
const stats = (request, response) => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = {
    me,
    stats
};
