// src/dbConfig/index.ts
// MongoDB connection configuration using Mongoose (production ready)

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        // const conn = await mongoose.connect(process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10, // Maximum number of sockets the MongoDB driver will keep open for this connection
            minPoolSize: 1,  // Minimum number of sockets
            serverSelectionTimeoutMS: 30000, // How long to try selecting a server (ms)
            // ...other options
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
