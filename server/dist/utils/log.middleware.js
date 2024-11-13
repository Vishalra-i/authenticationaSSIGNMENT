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
const log_model_1 = __importDefault(require("../models/log.model"));
const logUserAction = (actionType_1, userId_1, role_1, ...args_1) => __awaiter(void 0, [actionType_1, userId_1, role_1, ...args_1], void 0, function* (actionType, userId, role, additionalData = {}) {
    try {
        const log = new log_model_1.default({
            actionType,
            userId,
            role,
            additionalData,
            timestamp: new Date(),
        });
        yield log.save();
    }
    catch (error) {
        console.error('Error logging user action:', error);
    }
});
exports.default = logUserAction;
