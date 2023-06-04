"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_config_1 = require("../configs/knex.config");
const getProducts = async (userId, status = "fridge") => {
    const result = await (0, knex_config_1.knex)("products").where({ userId, status });
    return [true, result];
};
const getSingleProduct = async (productId) => {
    const result = await (0, knex_config_1.knex)("products").where("id", productId);
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
};
const addProduct = async (product) => {
    const result = await (0, knex_config_1.knex)("products").insert(product, ["id"]);
    if (result.length > 0) {
        return [true, result[0].id];
    }
    return [false, null];
};
const updateProduct = async (product) => {
    const { id, userId, ...rest } = product;
    const result = await (0, knex_config_1.knex)("products").where({ id, userId }).update(rest);
    if (result > 0) {
        return [true, result];
    }
    return [false, null];
};
const deleteProduct = async (id, userId) => {
    const result = await (0, knex_config_1.knex)("products").where({ id, userId }).del();
    if (result > 0) {
        return [true, result];
    }
    return [false, null];
};
exports.default = {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
