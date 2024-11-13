"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
// Public routes
router.post('/login', user_controller_1.login); // No jwtAuth required for login
router.post('/signup', user_controller_1.createUser);
// Protected routes
router.get('/logout', auth_middleware_1.default, user_controller_1.logout);
router.get('/getAllUser', auth_middleware_1.default, user_controller_1.getAllUser);
// Catch-all route for handling non-existent routes
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
exports.default = router;
