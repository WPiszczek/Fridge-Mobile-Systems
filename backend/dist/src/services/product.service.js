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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_config_1 = require("../configs/knex.config");
const getProducts = (userId, status = "fridge") => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("products").where({ userId, status });
    return [true, result];
});
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("products").where("id", productId);
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
});
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("products").insert(product, ["id"]);
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
});
const updateProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = product, rest = __rest(product, ["id", "userId"]);
    const result = yield (0, knex_config_1.knex)("products").where({ id, userId }).update(rest);
    if (result > 0) {
        return [true, result];
    }
    return [false, null];
});
const deleteProduct = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, knex_config_1.knex)("products").where({ id, userId }).del();
    if (result > 0) {
        return [true, result];
    }
    return [false, null];
});
exports.default = {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
