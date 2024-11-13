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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jwtAuth = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Extract token from cookies or Authorization header
    const token = ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
    if (!token) {
        throw new ApiError_1.default(401, 'No token provided');
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Find user by decoded ID
        const user = yield user_model_1.default.findById(decoded._id);
        if (!user) {
            throw new ApiError_1.default(401, 'Invalid token or user not found');
        }
        // Attach user to request
        req.user = user;
        next();
    }
    catch (err) {
        throw new ApiError_1.default(401, 'Invalid or expired token');
    }
}));
exports.default = jwtAuth;
