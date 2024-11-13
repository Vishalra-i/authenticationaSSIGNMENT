"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jwtAuth = (req, res, next) => {
    var _a;
    const key = req.cookies.key || ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    // if (!key) {
    //   throw new ApiError(401, 'No token provided');
    // }
    try {
        // const decoded = jwt.verify(key, process.env.JWT_SECRET as string) as UserToken;
        // req.user = decoded;  // Assign the decoded token to req.user
        next();
    }
    catch (err) {
        throw new ApiError_1.default(401, 'Invalid token');
    }
};
exports.default = jwtAuth;
