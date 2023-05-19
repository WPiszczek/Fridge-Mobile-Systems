"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const base_route_1 = require("./src/routes/base.route");
const auth_route_1 = require("./src/routes/auth.route");
const user_route_1 = require("./src/routes/user.route");
const product_route_1 = require("./src/routes/product.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const host_url = process.env.HOST_URL;
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: false,
        httpOnly: true
    }
}));
app.use((0, cors_1.default)({
    origin: "http://localhost:19000",
    methods: ["POST", "DELETE", "GET", "PATCH"],
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api", base_route_1.baseRouter);
app.use("/api", auth_route_1.authRouter);
app.use("/api", user_route_1.userRouter);
app.use("/api", product_route_1.productRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at ${host_url}:${port}/api`);
});
