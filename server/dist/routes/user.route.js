"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const logger_middleware_1 = __importDefault(require("../middlewares/logger.middleware"));
const router = (0, express_1.Router)();
router.post('/login', user_controller_1.login);
router.post('/logout', (0, logger_middleware_1.default)('LOGOUT'), user_controller_1.logout);
router.delete('/user/:id', auth_middleware_1.default, (0, logger_middleware_1.default)('DELETE_USER'), user_controller_1.deleteUser);
router.post('/signup', (0, logger_middleware_1.default)('CREATE_USER'), user_controller_1.createUser);
exports.default = router;
