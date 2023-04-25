import Express, { Request, Response } from "express";
import productController from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/sessionAuthentication";

export const productRouter = Express.Router();

productRouter.get(
  "/products",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log("GET /products");
    productController.getProducts(request, response);
  }
);

productRouter.get(
  "/products/:productId",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log(`GET /products/${request.params.productId}`);
    productController.getSingleProduct(request, response);
  }
);

productRouter.post(
  "/products",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log("POST /products");
    productController.addProduct(request, response);
  }
);

productRouter.patch(
  "/products/:productId",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log(`PATCH /products/${request.params.productId}`);
    productController.updateProduct(request, response);
  }
);

productRouter.delete(
  "/products/:productId",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log(`DELETE /products/${request.params.productId}`);
    productController.deleteProduct(request, response);
  }
);
