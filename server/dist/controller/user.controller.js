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
exports.getAllUser = exports.logout = exports.login = exports.createUser = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//cookie options
const options = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
//generate jwt token to store user with cokkie
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
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
    const token = generateToken(user);
    if (!token) {
        throw new ApiError_1.default(500, 'Token generation failed');
    }
    res.status(201)
        .cookie('token', token, options)
        .json(new ApiResponse_1.default(201, { user: user.toObject(), token }, 'User created successfully'));
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
    const token = generateToken(user);
    res.status(200)
        .cookie('token', token, options)
        .json(new ApiResponse_1.default(200, { user: user.toObject(), token }, 'User logged in successfully'));
}));
//Logout a user
exports.logout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.user)) {
        throw new ApiError_1.default(401, 'Unauthorized');
    }
    res.status(200)
        .clearCookie('token', options)
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
