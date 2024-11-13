"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logSchema = new mongoose_1.default.Schema({
    actionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
    additionalData: { type: mongoose_1.default.Schema.Types.Mixed },
    isDeleted: { type: Boolean, default: false }
});
const Log = mongoose_1.default.model('Log', logSchema);
exports.default = Log;
