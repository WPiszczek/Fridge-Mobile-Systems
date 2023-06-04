"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (request, response, next) => {
    if (request.session.userId)
        next();
    else
        return response.status(401).json({
            status: "FAIL",
            message: "Log in to continue."
        });
};
exports.isAuthenticated = isAuthenticated;
