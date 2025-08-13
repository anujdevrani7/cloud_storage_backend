// ErrorHandler.ts
// Custom error handler class for consistent error responses

class ErrorHandler extends Error {
    statusCode: number;
    message: string;
    errors?: any;

    constructor(message: string, statusCode: number = 500, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
