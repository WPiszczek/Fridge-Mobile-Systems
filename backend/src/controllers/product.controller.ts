import { Request, Response } from "express";
import productService from "../services/product.service";

const getProducts = async (request: Request, response: Response) => {
  const userId = request.session.userId;
  const status = request.query.status;

  await productService
    .getProducts(userId, status)
    .then((result) => {
      const [_, products] = result;
      response.status(200).json({
        status: "SUCCESS",
        data: products
      });
    })
    .catch((error) => {
      console.log("Error while fetching products.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while fetching products. Try again."
      });
    });
};

const getSingleProduct = async (request: Request, response: Response) => {
  const productId: number = parseInt(request.params.productId);
  const userId = request.session.userId;

  await productService
    .getSingleProduct(productId)
    .then((result) => {
      const [success, productData] = result;
      if (success) {
        if (productData.userId === userId) {
          response.status(200).json({
            status: "SUCCESS",
            data: productData
          });
        } else {
          response.status(401).json({
            status: "FAIL",
            data: "You are not authorised to get this product."
          });
        }
      } else {
        response.status(500).json({
          status: "FAIL",
          message: "Error while fetching product. Try again."
        });
      }
    })
    .catch((error) => {
      console.error("Error while fetching product.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while fetching product. Try again."
      });
    });
};

const addProduct = async (request: Request, response: Response) => {
  // TODO
};

const updateProduct = async (request: Request, response: Response) => {
  // TODO
};

const deleteProduct = async (request: Request, response: Response) => {
  // TODO
};

export default {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
