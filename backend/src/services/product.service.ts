import { knex } from "../configs/knex.config";

const getProduct = (productId: number) => {
  return knex("products").where('id', productId);
};

export default {
  getProduct
};
