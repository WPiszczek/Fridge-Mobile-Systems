import express, { Express } from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { baseRouter } from "./src/routes/base.route";
import { authRouter } from "./src/routes/auth.route";
import { userRouter } from "./src/routes/user.route";
import { productRouter } from "./src/routes/product.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host_url = process.env.HOST_URL;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: false,
      httpOnly: true,
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:19000",
    methods: ["POST", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", baseRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${host_url}:${port}/api`);
});
