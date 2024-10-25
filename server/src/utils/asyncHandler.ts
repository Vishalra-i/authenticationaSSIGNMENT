import { NextFunction, Request, Response } from "express";

function asyncHandler(requestHandle: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandle(req, res, next))
               .catch(next); 
    };
}

export default asyncHandler;
