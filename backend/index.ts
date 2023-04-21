import express, { Express } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import { baseRouter } from "./src/routes/base.route";
import { authRouter } from "./src/routes/auth.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host_url = process.env.HOST_URL;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.json());

app.use("/api", baseRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${host_url}:${port}/api`);
});
