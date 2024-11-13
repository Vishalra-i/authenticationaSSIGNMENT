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
const log_middleware_1 = __importDefault(require("../utils/log.middleware"));
const logMiddleware = (actionType) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.user) {
                yield (0, log_middleware_1.default)(actionType, req.user._id.toString(), req.user.role);
            }
        }
        catch (error) {
            console.error('Error in logging middleware:', error);
        }
        next();
    });
};
exports.default = logMiddleware;
