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
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const knex_config_1 = require("../configs/knex.config");
const login = ({ login, hashedPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("users").where({
        login,
        hashedPassword
    });
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
});
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("users").insert(userData, ["id"]);
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
});
const loginGoogle = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT_ID);
    const ticket = yield client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();
    return [name, email, picture];
});
exports.default = {
    login,
    register,
    loginGoogle
};
