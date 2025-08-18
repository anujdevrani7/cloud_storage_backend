import 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface User  {
    id: string;      // _id from MongoDB
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}


declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
