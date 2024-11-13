import { Request, Response, NextFunction } from 'express';
import logUserAction from '../utils/log.middleware';

const logMiddleware = (actionType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        await logUserAction(actionType, req.user._id.toString(), req.user.role);
      }
    } catch (error) {
      console.error('Error in logging middleware:', error);
    }
    next();
  };
};

export default logMiddleware;
