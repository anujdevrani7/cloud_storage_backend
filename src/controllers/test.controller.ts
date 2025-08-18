
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import ApiResponse from "../middlewares/ApiResponse";
import ErrorHandler from "../middlewares/ErrorHandler";

export const testing = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const flag = true

    if (flag) {
        // Success response
        return res.status(200).json(new ApiResponse("ok report", {
            data: {
                message: "ok "
            }
        }));
    } else {
        // Error response
        return next(new ErrorHandler("Operation failed", 400));
    }
});