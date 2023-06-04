"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const knex_config_1 = require("../configs/knex.config");
const login = async ({ login, hashedPassword }) => {
    const result = await (0, knex_config_1.knex)("users").where({
        login,
        hashedPassword
    });
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
};
const register = async (userData) => {
    const result = await (0, knex_config_1.knex)("users").insert(userData, ["id"]);
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
};
const loginGoogle = async (token) => {
    const client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.OAUTH_CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();
    return [name, email, picture];
};
exports.default = {
    login,
    register,
    loginGoogle
};
