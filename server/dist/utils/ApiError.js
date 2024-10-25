"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message = 'Something went wrong', error = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.stack = stack;
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.data = null;
        this.error = error;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
