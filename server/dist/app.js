"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const log_route_1 = __importDefault(require("./routes/log.route"));
const user_controller_1 = require("./controller/user.controller");
const app = (0, express_1.default)();
//important setups
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.get('/test-cookie', (req, res) => {
    res.cookie('test', 'value', user_controller_1.options);
    res.send('Cookie set');
});
//API Routes
app.get('/ping', (req, res) => {
    res.send("Hello World");
});
//user authentication routes
app.use('/api/v1/user', user_route_1.default); // Use modularized routes
app.use('/api/v1/log', log_route_1.default);
exports.default = app;
