import Express, { Request, Response } from "express";
import productController from "../controllers/product.controller";

export const productRouter = Express.Router();

productRouter.get("/:userId/products/:productId", (request: Request, response: Response) => {
  productController.getProduct(request, response);
});