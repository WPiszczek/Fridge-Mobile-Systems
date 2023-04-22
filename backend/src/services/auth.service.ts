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
    const userData = {
      id: result[0].id,
      login: result[0].login,
      email: result[0].email,
      firstName: result[0].firstName,
      lastName: result[0].lastName,
      pictureUrl: result[0].pictureUrl
    };
    return [true, userData];
  }
  return [false, null];
};

const register = async (userData: User) => {
  const result = await knex("users").insert(userData, ["id"]);
  if (result.length > 0) {
    const userDataWithId = { id: result[0].id, ...userData };
    return [true, userDataWithId];
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
