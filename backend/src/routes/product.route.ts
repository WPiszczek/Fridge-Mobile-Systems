import Express, { Request, Response } from "express";
import productController from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/sessionAuthentication";

export const productRouter = Express.Router();

productRouter.get(
  "/products/:productId",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log(`GET /products/${request.params.productId}`);
    productController.getProduct(request, response);
  }
);
