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
const knex_config_1 = require("../configs/knex.config");
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("users")
        .where("id", userId)
        .select("login", "email", "firstName", "lastName", "pictureUrl");
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
});
const getUserStats = (userId) => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = {
    getUser,
    getUserStats
};
