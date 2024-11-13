import ApiError  from '../utils/ApiError' ;
import ApiResponse  from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler' ;
import User  from '../models/user.model' ;
import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';

//cookie options
const options: CookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

//generate jwt token to store user with cokkie
const generateToken = (user: User) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return token;
};

//Sign Up
export const createUser = asyncHandler(async (req, res) => {
  const {firstName , lastName, email, password } = req?.body;

  if ( !firstName || !lastName || !email || !password) {
      throw new ApiError(400, 'Please fill all the fields');
  }

  const user = await User.create({firstName , lastName , email, password });

  if (!user) {
      throw new ApiError(500, 'User creation failed');
  }

  const token = generateToken(user);

  if(!token){
    throw new ApiError(500, 'Token generation failed')
  }

  res.status(201)
      .cookie('token', token, options)
      .json(new ApiResponse(201, { user: user.toObject(), token }, 'User created successfully'));
});


//Login a user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      throw new ApiError(400, 'Please fill all the fields');
  }

  console.log(email)
  const user = await User.findOne({ email });

  if (!user) {
      throw new ApiError(404, 'Users not found');
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user);

  res.status(200)
      .cookie('token', token, options)
      .json(new ApiResponse(200, { user: user.toObject(), token }, 'User logged in successfully'));
});


//Logout a user
export const logout = asyncHandler(async (req, res) => {
  if (!req?.user) {
      throw new ApiError(401, 'Unauthorized');
  }

  res.status(200)
      .clearCookie('token', options)
      .json(new ApiResponse(200, {}, 'User logged out successfully'));
});


//get all user
export const getAllUser = asyncHandler(async (req, res) => {
    if (!req?.user) {
        throw new ApiError(401, 'Unauthorized');
    }

    const loggedUser = await User.findById(req.user._id);

    if (!loggedUser) {
        throw new ApiError(404, 'User not found');
    }

    const isAdmin = await loggedUser.isAdmin();

    if (!isAdmin) {
        throw new ApiError(403, 'Forbidden');
    }

    // Extract pagination parameters and explicitly cast to strings
    const { page = "1", limit = "10" } = req.query as { page?: string; limit?: string };
    
    // Convert the extracted strings to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);


    // Calculate pagination values
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find()
        .select('-password')
        .skip(skip)
        .limit(limitNum);

    const totalUsers = await User.countDocuments();

    if (!users || users.length === 0) {
        throw new ApiError(404, 'No users found');
    }

    res.status(200).json(
        new ApiResponse(200, {
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNum),
            currentPage: pageNum,
            users,
        }, 'Users retrieved successfully')
    );
});


