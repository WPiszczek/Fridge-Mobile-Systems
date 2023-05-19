"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const getProducts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.session.userId;
    const status = request.query.status;
    yield product_service_1.default
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
});
const getSingleProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(request.params.productId);
    const userId = request.session.userId;
    yield product_service_1.default
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
});
const addProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    yield product_service_1.default
        .addProduct({
        userId: request.session.userId,
        productCode: (_a = request.body.productCode) !== null && _a !== void 0 ? _a : null,
        productName: (_b = request.body.productName) !== null && _b !== void 0 ? _b : null,
        pictureUrl: (_c = request.body.pictureUrl) !== null && _c !== void 0 ? _c : null,
        status: request.body.status,
        quantity: (_d = request.body.quantity) !== null && _d !== void 0 ? _d : null,
        usagePercentage: (_e = request.body.usagePercentage) !== null && _e !== void 0 ? _e : null,
        expirationDate: (_f = request.body.expirationDate) !== null && _f !== void 0 ? _f : null,
        openingDate: (_g = request.body.openingDate) !== null && _g !== void 0 ? _g : null,
        openExpirationDate: (_h = request.body.openExpirationDate) !== null && _h !== void 0 ? _h : null
    })
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
});
const updateProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p, _q, _r;
    yield product_service_1.default
        .updateProduct({
        id: parseInt(request.params.productId),
        userId: request.session.userId,
        productCode: (_j = request.body.productCode) !== null && _j !== void 0 ? _j : null,
        productName: (_k = request.body.productName) !== null && _k !== void 0 ? _k : null,
        pictureUrl: (_l = request.body.pictureUrl) !== null && _l !== void 0 ? _l : null,
        status: request.body.status,
        quantity: (_m = request.body.quantity) !== null && _m !== void 0 ? _m : null,
        usagePercentage: (_o = request.body.usagePercentage) !== null && _o !== void 0 ? _o : null,
        expirationDate: (_p = request.body.expirationDate) !== null && _p !== void 0 ? _p : null,
        openingDate: (_q = request.body.openingDate) !== null && _q !== void 0 ? _q : null,
        openExpirationDate: (_r = request.body.openExpirationDate) !== null && _r !== void 0 ? _r : null
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
});
const deleteProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(request.params.productId);
    const userId = request.session.userId;
    yield product_service_1.default
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
});
exports.default = {
    getProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
