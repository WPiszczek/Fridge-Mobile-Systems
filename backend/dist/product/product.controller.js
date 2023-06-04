"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product.service"));
const getProducts = async (request, response) => {
    const userId = request.session.userId;
    const status = request.query.status;
    await product_service_1.default
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
const getSingleProduct = async (request, response) => {
    const productId = parseInt(request.params.productId);
    const userId = request.session.userId;
    await product_service_1.default
        .getSingleProduct(productId)
        .then((result) => {
        const [success, productData] = result;
        if (success) {
            if (productData.userId === userId) {
                response.status(200).json({
                    status: "SUCCESS",
                    data: productData
                });
            }
            else {
                response.status(401).json({
                    status: "FAIL",
                    data: "You are not authorised to get this product."
                });
            }
        }
        else {
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
const addProduct = async (request, response) => {
    await product_service_1.default
        .addProduct({
        userId: request.session.userId,
        productCode: request.body.productCode ?? null,
        productName: request.body.productName ?? null,
        pictureUrl: request.body.pictureUrl ?? null,
        status: request.body.status,
        quantity: request.body.quantity ?? null,
        usagePercentage: request.body.usagePercentage ?? null,
        expirationDate: request.body.expirationDate ?? null,
        openingDate: request.body.openingDate ?? null,
        openExpirationDate: request.body.openExpirationDate ?? null
    }, request.body.tags)
        .then((result) => {
        const [success, _] = result;
        if (success) {
            response.status(201).json({
                status: "SUCCESS",
                message: "Product added successfully."
            });
        }
        else {
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
const updateProduct = async (request, response) => {
    await product_service_1.default
        .updateProduct({
        id: parseInt(request.params.productId),
        userId: request.session.userId,
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
        }
        else {
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
const deleteProduct = async (request, response) => {
    const productId = parseInt(request.params.productId);
    const userId = request.session.userId;
    await product_service_1.default
        .deleteProduct(productId, userId)
        .then((result) => {
        const [success, _] = result;
        if (success) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Product deleted successfully."
            });
        }
        else {
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
exports.default = {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
