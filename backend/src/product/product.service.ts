import { knex } from "../configs/knex.config";
import { Product } from "../models/product.model";

const getProducts = async (userId: any, status: any = "exists") => {
  const result = await knex("products")
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
      knex.raw(
        "JSON_AGG(JSON_BUILD_OBJECT('id', tags.id, 'name', tags.name)) filter (where tags.name is not null) as tags"
      )
    ])
    .groupBy("products.id");
  return [true, result];
};

const getSingleProduct = async (productId: number) => {
  const result = await knex("products")
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
      knex.raw(
        "JSON_AGG(JSON_BUILD_OBJECT('id', tags.id, 'name', tags.name)) filter (where tags.name is not null) as tags"
      )
    ])
    .groupBy("products.id");
  if (result.length > 0) {
    return [true, result[0]];
  }
  return [false, null];
};

const addProduct = async (
  product: Product,
  tags: { id?: number; name: string }[]
) => {
  const notInsertedTags = tags.filter((elem) => !elem.id);
  let insertedTagsIds = tags.filter((elem) => elem.id).map((elem) => elem.id);
  if (notInsertedTags.length > 0) {
    const tagsResult = await knex("tags").insert(notInsertedTags, ["id"]);
    if (tagsResult.length == 0) {
      return [false, null];
    }
    insertedTagsIds = insertedTagsIds.concat(tagsResult.map((elem) => elem.id));
  }
  const productsResult = await knex("products").insert(product, ["id"]);
  if (productsResult.length == 0) {
    return [false, null];
  }
  const productTagsResult = await knex("product_tags").insert(
    insertedTagsIds.map((elem) => {
      return { tagId: elem, productId: productsResult[0].id };
    }),
    ["tagId", "productId"]
  );
  if (productTagsResult.length == 0) {
    return [false, null];
  }
  return [true, productsResult[0].id];
};

const updateProduct = async (product: Product) => {
  const { id, userId, ...rest } = product;
  const result = await knex("products").where({ id, userId }).update(rest);
  if (result > 0) {
    return [true, result];
  }
  return [false, null];
};

const deleteProduct = async (id: number, userId: number) => {
  const result = await knex("products").where({ id, userId }).del();
  if (result > 0) {
    return [true, result];
  }
  return [false, null];
};

export default {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
