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
exports.deleteUser = exports.getAllUser = exports.logout = exports.login = exports.createUser = exports.options = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const log_middleware_1 = __importDefault(require("../utils/log.middleware"));
//cookie options
exports.options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
//generate jwt key to store user with cokkie
const generateToken = (user) => {
    const key = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return key;
};
//Sign Up
exports.createUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req === null || req === void 0 ? void 0 : req.body;
    if (!firstName || !lastName || !email || !password) {
        throw new ApiError_1.default(400, 'Please fill all the fields');
    }
    const user = yield user_model_1.default.create({ firstName, lastName, email, password });
    if (!user) {
        throw new ApiError_1.default(500, 'User creation failed');
    }
    if (!key) {
        throw new ApiError_1.default(500, 'Token generation failed');
    }
    const id = user._id;
    // Log the login action
    yield (0, log_middleware_1.default)('SIGNUP', id.toString(), user.role);
    res.status(201)
        .json(new ApiResponse_1.default(201, { user: user.toObject(), key }, 'User created successfully'));
}));
//Login a user
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.default(400, 'Please fill all the fields');
    }
    console.log(email);
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(404, 'Users not found');
    }
    const isMatch = yield user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const key = generateToken(user);
    const _id = user._id;
    // Log the login action
    yield (0, log_middleware_1.default)('LOGIN', _id.toString(), user.role);
    res.status(200)
        .cookie('key', key, exports.options)
        .cookie('role', user.role, exports.options)
        .json(new ApiResponse_1.default(200, { user: user.toObject(), key }, 'User logged in successfully'));
}));
//Logout a user
exports.logout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        throw new ApiError_1.default(401, 'Unauthorized');
    }
    yield (0, log_middleware_1.default)('LOGOUT', req === null || req === void 0 ? void 0 : req.user._id.toString(), req === null || req === void 0 ? void 0 : req.user.role);
    console.log("user logout");
    res.status(200)
        .clearCookie('key', exports.options)
        .clearCookie('role', exports.options)
        .json(new ApiResponse_1.default(200, {}, 'User logged out successfully'));
}));
//get all user
exports.getAllUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        throw new ApiError_1.default(401, 'Unauthorized');
    }
    const loggedUser = yield user_model_1.default.findById(req.user._id);
    if (!loggedUser) {
        throw new ApiError_1.default(404, 'User not found');
    }
    const isAdmin = yield loggedUser.isAdmin();
    if (!isAdmin) {
        throw new ApiError_1.default(403, 'Forbidden');
    }
    // Extract pagination parameters and explicitly cast to strings
    const { page = "1", limit = "10" } = req.query;
    // Convert the extracted strings to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    // Calculate pagination values
    const skip = (pageNum - 1) * limitNum;
    const users = yield user_model_1.default.find()
        .select('-password')
        .skip(skip)
        .limit(limitNum);
    const totalUsers = yield user_model_1.default.countDocuments();
    if (!users || users.length === 0) {
        throw new ApiError_1.default(404, 'No users found');
    }
    res.status(200).json(new ApiResponse_1.default(200, {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limitNum),
        currentPage: pageNum,
        users,
    }, 'Users retrieved successfully'));
}));
exports.deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(404, 'User not found');
    }
    yield user.deleteOne();
    const _id = user._id;
    // Log the delete action
    yield (0, log_middleware_1.default)('DELETE_USER', _id.toString(), user.role);
    res.status(200).json(new ApiResponse_1.default(200, {}, 'User deleted successfully'));
}));
