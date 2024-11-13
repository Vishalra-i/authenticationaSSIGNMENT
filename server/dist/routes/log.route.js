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
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const log_model_1 = __importDefault(require("../models/log.model"));
const router = (0, express_1.Router)();
router.get('/logs', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { actionType, startDate, endDate, page = 1, limit = 10 } = req === null || req === void 0 ? void 0 : req.query;
    const query = { isDeleted: false };
    if (actionType)
        query.actionType = actionType;
    if (startDate && endDate)
        query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    try {
        const logs = yield log_model_1.default.find(query)
            .sort({ timestamp: -1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const totalLogs = yield log_model_1.default.countDocuments(query);
        res.json({
            logs,
            totalLogs,
            totalPages: Math.ceil(totalLogs / +limit),
            currentPage: +page,
        });
    }
    catch (err) {
        res.status(500).send('Error fetching logs');
    }
}));
exports.default = router;
