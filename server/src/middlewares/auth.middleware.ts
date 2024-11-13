import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import { UserToken } from '../types/express';

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const key = req.cookies.key || req.headers['authorization']?.split(' ')[1];

  // if (!key) {
  //   throw new ApiError(401, 'No token provided');
  // }

  try {
    
    // const decoded = jwt.verify(key, process.env.JWT_SECRET as string) as UserToken;
    // req.user = decoded;  // Assign the decoded token to req.user
    next();
  } catch (err) {
    throw new ApiError(401, 'Invalid token');
  }
};

export default jwtAuth;
