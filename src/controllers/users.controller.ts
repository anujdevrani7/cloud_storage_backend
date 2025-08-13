
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../modals/User.model";
import ApiResponse from "../middlewares/ApiResponse";
import ErrorHandler from "../middlewares/ErrorHandler";
import asyncHandler from "../middlewares/asyncHandler";
import { AddUserInput, loginSchemaType } from "../schema/userSchema";
import Constants from "../constants/constants";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../s3Config";



export const addNewUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, password, username, email }: AddUserInput = req.body

    const checkUniqueUserName = await User.findOne({ username }, { firstName: 1 })
    const checkUniqueEmail = await User.findOne({ email })

    if (checkUniqueUserName) {
        return next(new ErrorHandler("username already exist ", 400))
    }
    if (checkUniqueEmail) {
        return next(new ErrorHandler("email already exist ", 400))
    }
    const hashedPass = await bcrypt.hash(password, Constants.SALT_ROUND)


    const user = await User.create({
        firstName,
        lastName,
        password: hashedPass,
        username,
        email
    })

    const command = new PutObjectCommand({
        Bucket: Constants.S3_BUCKET,
        Key: user.id + '/',
        Body: "", // zero-byte object
    });
    await s3Client.send(command);
    return res.status(200).json(new ApiResponse(true, "user added successfully"))
});

export const getUser = asyncHandler(async (req, res, next) => {
    console.log("value of the user is  : ", req.user)

    const data = await User.find({})
    return res.status(200).json(new ApiResponse(true, "user fetched successfully", data))
})

export const login = asyncHandler(async (req, res, next) => {
    const { email, password }: loginSchemaType = req.body;
    // Compare password

    const user = await User.findOne({ email }, { password: 1, firstName: 1, lastName: 1 })
    if (!user) {
        return next(new ErrorHandler("invalid email ", 401))
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid  password", 401));
    }
    const userObj = {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }


    // Generate JWT
    const token = jwt.sign(
        userObj,
        process.env.JWT_SECRET!,
        { expiresIn: "2d" }
    );

    // Set cookie (httpOnly, secure in production)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // // Remove password from user object
    // const userObj = user.toObject();
    // delete userObj.password;

    return res.status(200).json(new ApiResponse(true, "Login successful", token));
});
export const signUp = asyncHandler(async (req, res, next) => {

})