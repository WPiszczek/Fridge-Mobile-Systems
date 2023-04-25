import { knex } from "../configs/knex.config";

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

const addProduct = async () => {};

const updateProduct = async () => {};

const deleteProduct = async () => {};

export default {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
