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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const login = request.body.login;
    const hashedPassword = request.body.hashedPassword;
    yield auth_service_1.default
        .login({ login, hashedPassword })
        .then((result) => {
        const [success, userId] = result;
        request.session.regenerate((err) => {
            if (err)
                console.error(err);
            request.session.userId = userId;
            request.session.save((err) => {
                if (err)
                    console.error(err);
                if (success) {
                    response.status(200).json({
                        status: "SUCCESS",
                        message: "Successful login."
                    });
                }
                else {
                    response.status(401).json({
                        status: "FAIL",
                        message: "Invalid login and/or password."
                    });
                }
            });
        });
    })
        .catch((error) => {
        console.error("Error while logging in.");
        console.error(error.message);
        response.status(500).json({
            status: "FAIL",
            message: "Error while logging in. Try again."
        });
    });
});
const logout = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    request.session.regenerate((err) => {
        if (err)
            console.error(err);
        request.session.userId = null;
        request.session.save((err) => {
            if (err) {
                response.status(500).json({
                    status: "FAIL",
                    message: "Error while logout. Try again"
                });
            }
            else {
                response.status(200).json({
                    status: "SUCCESS",
                    message: "Successful logout."
                });
            }
        });
    });
});
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const login = request.body.login;
    const email = request.body.email;
    const hashedPassword = request.body.hashedPassword;
    const firstName = (_a = request.body.firstName) !== null && _a !== void 0 ? _a : null;
    const lastName = (_b = request.body.lastName) !== null && _b !== void 0 ? _b : null;
    const pictureUrl = (_c = request.body.pictureUrl) !== null && _c !== void 0 ? _c : null;
    yield auth_service_1.default
        .register({
        login,
        email,
        hashedPassword,
        firstName,
        lastName,
        pictureUrl
    })
        .then((result) => {
        const [success, userId] = result;
        request.session.regenerate((err) => {
            if (err)
                console.error(err);
            request.session.userId = userId;
            request.session.save((err) => {
                if (err)
                    console.error(err);
                if (success) {
                    response.status(201).json({
                        status: "SUCCESS",
                        message: "Successful registration."
                    });
                }
                else {
                    response.status(500).json({
                        status: "FAIL",
                        message: "Error while registering. Try again."
                    });
                }
            });
        });
    })
        .catch((error) => {
        console.error("Error while register.");
        console.error(error.message);
        if (error.message.includes("users_login_key")) {
            response.status(409).json({
                status: "FAIL",
                message: "Given login is already used. Try again."
            });
        }
        else if (error.message.includes("users_email_key")) {
            response.status(409).json({
                status: "FAIL",
                message: "Given email is already used. Try again."
            });
        }
        else {
            response.status(500).json({
                status: "FAIL",
                message: "Error while registering. Try again."
            });
        }
    });
});
// TODO
const loginGoogle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.body.token;
    yield auth_service_1.default.loginGoogle(token).then((result) => {
        const [name, email, picture] = result;
        // TODO
        // response.json({
        //   status: "SUCCESS",
        //   data: userData
        // });
    });
});
exports.default = {
    login,
    logout,
    register,
    loginGoogle
};
