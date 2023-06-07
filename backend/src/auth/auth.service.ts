import { OAuth2Client } from "google-auth-library";
import { knex } from "../configs/knex.config";
import { User } from "../models/user.model";

const login = async ({
  login,
  hashedPassword
}: {
  login: string;
  hashedPassword: string;
}) => {
  const result = await knex("users").where({
    login,
    hashedPassword
  });
  if (result.length > 0) {
    return [true, result[0].id];
  }
  return [false, null];
};

const register = async (userData: User) => {
  const result = await knex("users").insert(userData, ["id"]);
  if (result.length > 0) {
    return [true, result[0].id];
  }
  return [false, null];
};

const loginGoogle = async (userData: any) => {
  const result = await knex("users").where("googleToken", userData.googleToken);
  if (result.length > 0) {
    return [true, result[0].id];
  }
  const resultInsert = await knex("users").insert(userData, ["id"]);
  if (resultInsert.length > 0) {
    return [true, resultInsert[0].id];
  }
  return [false, null];
};

export default {
  login,
  register,
  loginGoogle
};
