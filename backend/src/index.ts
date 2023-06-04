import express, { Express } from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import ip from "ip";
import { baseRouter } from "./base/base.route";
import { authRouter } from "./auth/auth.route";
import { userRouter } from "./user/user.route";
import { productRouter } from "./product/product.route";

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
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  })
);
app.use(
  cors({
    origin: ["http://localhost:19000", `http://${ip.address()}:19000`],
    methods: ["POST", "DELETE", "GET", "PATCH"],
    credentials: true
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
