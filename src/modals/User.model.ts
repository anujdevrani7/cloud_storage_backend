// User.model.ts
// Production-ready Mongoose model for users

import mongoose, { Document, Schema,Types } from 'mongoose';

export interface IUser extends Document {
    // userUniqueId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
}

const userModel: Schema = new Schema<IUser>(
    {
        // userUniqueId: {
        //     type: String,
        //     default: uuidv4,
        //     unique: true,
        //     required: true,
        //     index: true,
        // },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false, // do not return password by default
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', userModel);
export default User;
