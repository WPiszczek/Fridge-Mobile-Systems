"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_config_1 = require("../configs/knex.config");
const getUser = async (userId) => {
    const result = await (0, knex_config_1.knex)("users")
        .where("id", userId)
        .select("login", "email", "firstName", "lastName", "pictureUrl");
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
};
const getUserStats = async (userId, numberOfDays) => {
    const eatenCountQuery = (0, knex_config_1.knex)("stats")
        .where({ userId, eaten: true })
        .andWhere(knex_config_1.knex.raw(`to_date(date, 'YYYY-MM-DD') > current_date - interval '${numberOfDays}' day`))
        .count()
        .as("eatenCount");
    const disposedCountQuery = (0, knex_config_1.knex)("stats")
        .where({ userId, eaten: false })
        .andWhere(knex_config_1.knex.raw(`to_date(date, 'YYYY-MM-DD') > current_date - interval '${numberOfDays}' day`))
        .count()
        .as("disposedCount");
    const result = await (0, knex_config_1.knex)().select(eatenCountQuery, disposedCountQuery);
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
};
const getTags = async () => {
    const result = await (0, knex_config_1.knex)("tags").select("id", "name");
    if (result.length > 0) {
        return [true, result];
    }
    return [false, null];
};
exports.default = {
    getUser,
    getUserStats,
    getTags
};
