"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const loginGoogle = async (userData) => {
    const result = await (0, knex_config_1.knex)("users").where("googleToken", userData.googleToken);
    if (result.length > 0) {
        return [true, result[0].id];
    }
    const resultInsert = await (0, knex_config_1.knex)("users").insert(userData, ["id"]);
    if (resultInsert.length > 0) {
        return [true, resultInsert[0].id];
    }
    return [false, null];
};
exports.default = {
    login,
    register,
    loginGoogle
};
