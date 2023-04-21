import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
});
