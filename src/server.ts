// server.ts
// Entry point for production: connects to DB, starts server, and handles graceful shutdown

import dotenv from 'dotenv';
dotenv.config();

import app from './index';

import connectDB from './dbConfig/index';

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Process terminated');
            });
        });
        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Process interrupted');
            });
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
