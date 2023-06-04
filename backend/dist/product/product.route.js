"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("./product.controller"));
const sessionAuthentication_1 = require("../middlewares/sessionAuthentication");
exports.productRouter = express_1.default.Router();
exports.productRouter.get("/products", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log("GET /products");
    product_controller_1.default.getProducts(request, response);
});
exports.productRouter.get("/products/:productId", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log(`GET /products/${request.params.productId}`);
    product_controller_1.default.getSingleProduct(request, response);
});
exports.productRouter.post("/products", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log("POST /products");
    product_controller_1.default.addProduct(request, response);
});
exports.productRouter.patch("/products/:productId", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log(`PATCH /products/${request.params.productId}`);
    product_controller_1.default.updateProduct(request, response);
});
exports.productRouter.delete("/products/:productId", sessionAuthentication_1.isAuthenticated, (request, response) => {
    console.log(`DELETE /products/${request.params.productId}`);
    product_controller_1.default.deleteProduct(request, response);
});
