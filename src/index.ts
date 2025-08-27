import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import ErrorHandler from './middlewares/ErrorHandler';
import testRouter from "./routers/test.router";
import userRouter from "./routers/users";
import storageRouter from "./routers/storage";
import folderRouter from "./routers/folder";
import { NextFunction } from 'express';
import Constants from './constants/constants';


dotenv.config();

const app = express();
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const apiPrefix = Constants.API_PREFIX;
app.get('/', (req: Request, res: Response) => {
    res.send('server is up and running ');
});


app.use(`${apiPrefix}/test`, testRouter);
app.use(`${apiPrefix}/users`, userRouter);
app.use(`${apiPrefix}/storage`, storageRouter);
app.use(`${apiPrefix}/folder`, folderRouter);




// Global Error Handler Middleware

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let customError = err;
    if (!(err instanceof ErrorHandler)) {
        customError = new ErrorHandler(err.message || 'Internal Server Error', err.statusCode || 500);
    }
    const errorResponse: any = {
        success: false,
        message: customError.message,
        stack: process.env.NODE_ENV === 'development' ? customError.stack : undefined
    };
    if (customError.errors !== null && customError.errors !== undefined) {
        errorResponse.errors = customError.errors;
    }
    res.status(customError.statusCode).json(errorResponse);
});

export default app