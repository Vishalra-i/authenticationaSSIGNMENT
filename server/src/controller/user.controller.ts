import ApiError  from '../utils/ApiError' ;
import ApiResponse  from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler' ;
import User  from '../models/user.model' ;
import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';
import logUserAction from '../utils/log.middleware';

//cookie options
export const options: CookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production' ? true : false,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

//generate jwt key to store user with cokkie
const generateToken = (user: User) => {
  const key = jwt.sign({ _id: user._id , role : user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return key;
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


  if(!key){
    throw new ApiError(500, 'Token generation failed')
  }

  const id = user._id as string
  // Log the login action
  await logUserAction('SIGNUP', id.toString(), user.role);


  res.status(201)
      .json(new ApiResponse(201, { user: user.toObject(), key }, 'User created successfully'));
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

  const key = generateToken(user);
  const _id = user._id as string
  // Log the login action
  await logUserAction('LOGIN', _id.toString(), user.role );

  res.status(200)
      .cookie('key', key, options)
      .cookie('role', user.role, options)
      .json(new ApiResponse(200, { user: user.toObject(), key }, 'User logged in successfully'));
});


//Logout a user
export const logout = asyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  await logUserAction('LOGOUT', req?.user._id.toString(), req?.user.role);
  console.log("user logout")
 
  res.status(200)
      .clearCookie('key', options)
      .clearCookie('role', options)
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

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    await user.deleteOne();
  
    const _id = user._id as string
    // Log the delete action
    await logUserAction('DELETE_USER', _id.toString(), user.role);
  
    res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
  });
  


