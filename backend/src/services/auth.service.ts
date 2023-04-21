import { OAuth2Client } from "google-auth-library";
import { knex } from "../configs/knex.config";

const login = (login: string, hashedPassword: string) => {
  return knex("users").where({ login, hashed_password: hashedPassword });
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
  loginGoogle
};
