"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const login = async (request, response) => {
    const login = request.body.login;
    const hashedPassword = request.body.hashedPassword;
    await auth_service_1.default
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
};
const logout = async (request, response) => {
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
};
const register = async (request, response) => {
    const login = request.body.login;
    const email = request.body.email;
    const hashedPassword = request.body.hashedPassword;
    const firstName = request.body.firstName ?? null;
    const lastName = request.body.lastName ?? null;
    const pictureUrl = request.body.pictureUrl ?? null;
    await auth_service_1.default
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
};
// TODO
const loginGoogle = async (request, response) => {
    const token = request.body.token;
    await auth_service_1.default.loginGoogle(token).then((result) => {
        const [name, email, picture] = result;
        // TODO
        // response.json({
        //   status: "SUCCESS",
        //   data: userData
        // });
    });
};
exports.default = {
    login,
    logout,
    register,
    loginGoogle
};
