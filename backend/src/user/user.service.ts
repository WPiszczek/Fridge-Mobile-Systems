import { knex } from "../configs/knex.config";

const getUser = async (userId: any) => {
  const result = await knex("users")
    .where("id", userId)
    .select("login", "email", "firstName", "lastName", "pictureUrl");
  
  if (result.length > 0) {
    return [true, result[0]];
  }
  return [false, null];
};

const getUserStats = async (userId: any) => {};

export default {
  getUser,
  getUserStats
};
