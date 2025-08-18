// isAuthentaticUser.ts
// Middleware to validate if user is logged in using JWT from cookie

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler";
import { User } from "../../types/express";

const isAuthentaticUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers['authorization']?.replace('Bearer ', '');
    // console.log("value of the token is  : ", token)

    if (!token) {
        return next(new ErrorHandler("Authentication required", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)as User ;
        req.user = decoded;

        
        next();
    } catch (err) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};

export default isAuthentaticUser;
