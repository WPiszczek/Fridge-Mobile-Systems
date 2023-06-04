import { Request, Response } from "express";
import productService from "./product.service";
import { Product } from "../models/product.model";

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
  await productService
    .addProduct(
      {
        userId: request.session.userId!,
        productCode: request.body.productCode ?? null,
        productName: request.body.productName ?? null,
        pictureUrl: request.body.pictureUrl ?? null,
        status: request.body.status,
        quantity: request.body.quantity ?? null,
        usagePercentage: request.body.usagePercentage ?? null,
        expirationDate: request.body.expirationDate ?? null,
        openingDate: request.body.openingDate ?? null,
        openExpirationDate: request.body.openExpirationDate ?? null
      },
      request.body.tags
    )
    .then((result) => {
      const [success, _] = result;
      if (success) {
        response.status(201).json({
          status: "SUCCESS",
          message: "Product added successfully."
        });
      } else {
        response.status(500).json({
          status: "FAIL",
          message: "Error while adding product. Try again."
        });
      }
    })
    .catch((error) => {
      console.error("Error while adding product.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while adding product. Try again."
      });
    });
};

const updateProduct = async (request: Request, response: Response) => {
  await productService
    .updateProduct({
      id: parseInt(request.params.productId),
      userId: request.session.userId!,
      productCode: request.body.productCode ?? null,
      productName: request.body.productName ?? null,
      pictureUrl: request.body.pictureUrl ?? null,
      status: request.body.status,
      quantity: request.body.quantity ?? null,
      usagePercentage: request.body.usagePercentage ?? null,
      expirationDate: request.body.expirationDate ?? null,
      openingDate: request.body.openingDate ?? null,
      openExpirationDate: request.body.openExpirationDate ?? null
    })
    .then((result) => {
      const [success, _] = result;
      if (success) {
        response.status(200).json({
          status: "SUCCESS",
          message: "Product updated successfully."
        });
      } else {
        response.status(500).json({
          status: "FAIL",
          message: "Error while updating product. Try again."
        });
      }
    })
    .catch((error) => {
      console.error("Error while updating product.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while updating product. Try again."
      });
    });
};

const deleteProduct = async (request: Request, response: Response) => {
  const productId = parseInt(request.params.productId);
  const userId = request.session.userId!;

  await productService
    .deleteProduct(productId, userId)
    .then((result) => {
      const [success, _] = result;
      if (success) {
        response.status(200).json({
          status: "SUCCESS",
          message: "Product deleted successfully."
        });
      } else {
        response.status(500).json({
          status: "FAIL",
          message: "Error while deleting product. Try again."
        });
      }
    })
    .catch((error) => {
      console.error("Error while deleting product.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while deleting product. Try again."
      });
    });
};

export default {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
