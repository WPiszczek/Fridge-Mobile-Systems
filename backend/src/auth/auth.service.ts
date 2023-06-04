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

const loginGoogle = async (token: any) => {
  const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.OAUTH_CLIENT_ID
  });

  const { name, email, picture }: any = ticket.getPayload();
  return [name, email, picture];
};

export default {
  login,
  register,
  loginGoogle
};
