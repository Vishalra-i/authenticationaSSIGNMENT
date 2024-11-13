import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';

const jwtAuth = asyncHandler(async (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req?.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new ApiError(401, 'No token provided');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };

        // Find user by decoded ID
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(401, 'Invalid token or user not found');
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        throw new ApiError(401, 'Invalid or expired token');
    }
});

export default jwtAuth;
