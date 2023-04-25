import { knex } from "../configs/knex.config";
import { Product } from "../models/product.model";

const getProducts = async (userId: any, status: any = "fridge") => {
  const result = await knex("products").where({ userId, status });
  return [true, result];
};

const getSingleProduct = async (productId: number) => {
  const result = await knex("products").where("id", productId);
  if (result.length > 0) {
    return [true, result[0]];
  }
  return [false, null];
};

const addProduct = async (product: Product) => {
  const result = await knex("products").insert(product, ["id"]);
  if (result.length > 0) {
    return [true, result[0].id];
  }
  return [false, null];
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
