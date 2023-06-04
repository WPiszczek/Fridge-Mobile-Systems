"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_config_1 = require("../configs/knex.config");
const getProducts = async (userId, status = "exists") => {
    const result = await (0, knex_config_1.knex)("products")
        .where({ userId, status })
        .leftJoin("product_tags", "products.id", "product_tags.productId")
        .leftJoin("tags", "product_tags.tagId", "tags.id")
        .select([
        "products.id as id",
        "userId",
        "productCode",
        "productName",
        "quantity",
        "pictureUrl",
        "status",
        "usagePercentage",
        "expirationDate",
        "openingDate",
        "openExpirationDate",
        knex_config_1.knex.raw("JSON_AGG(JSON_BUILD_OBJECT('id', tags.id, 'name', tags.name)) filter (where tags.name is not null) as tags")
    ])
        .groupBy("products.id");
    return [true, result];
};
const getSingleProduct = async (productId) => {
    const result = await (0, knex_config_1.knex)("products")
        .where("products.id", productId)
        .leftJoin("product_tags", "products.id", "product_tags.productId")
        .leftJoin("tags", "product_tags.tagId", "tags.id")
        .select([
        "products.id as id",
        "userId",
        "productCode",
        "productName",
        "quantity",
        "pictureUrl",
        "status",
        "usagePercentage",
        "expirationDate",
        "openingDate",
        "openExpirationDate",
        knex_config_1.knex.raw("JSON_AGG(JSON_BUILD_OBJECT('id', tags.id, 'name', tags.name)) filter (where tags.name is not null) as tags")
    ])
        .groupBy("products.id");
    if (result.length > 0) {
        return [true, result[0]];
    }
    return [false, null];
};
const addProduct = async (product, tags) => {
    const notInsertedTags = tags.filter((elem) => !elem.id);
    let insertedTagsIds = tags.filter((elem) => elem.id).map((elem) => elem.id);
    if (notInsertedTags.length > 0) {
        const tagsResult = await (0, knex_config_1.knex)("tags").insert(notInsertedTags, ["id"]);
        if (tagsResult.length == 0) {
            return [false, null];
        }
        insertedTagsIds = insertedTagsIds.concat(tagsResult.map((elem) => elem.id));
    }
    const productsResult = await (0, knex_config_1.knex)("products").insert(product, ["id"]);
    if (productsResult.length == 0) {
        return [false, null];
    }
    const productTagsResult = await (0, knex_config_1.knex)("product_tags").insert(insertedTagsIds.map((elem) => {
        return { tagId: elem, productId: productsResult[0].id };
    }), ["tagId", "productId"]);
    if (productTagsResult.length == 0) {
        return [false, null];
    }
    return [true, productsResult[0].id];
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
