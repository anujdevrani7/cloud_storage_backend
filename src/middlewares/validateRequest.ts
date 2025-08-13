// validateRequest.ts
// Middleware to validate request body using Zod and reject extra fields

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import ErrorHandler from './ErrorHandler';


const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            // Format errors to include field name and message
            const formattedErrors = err.issues.map(issue => ({
                field: issue.path.join('.') || undefined,
                message: issue.message,
                code: issue.code
            }));
            // Check for unrecognized keys (extra fields)
            const extraFields = err.issues.filter(issue => issue.code === 'unrecognized_keys');
            if (extraFields.length > 0) {
                const fields = extraFields.map(issue => issue.keys).flat();
                return next(new ErrorHandler(`Extra fields not allowed: ${fields.join(', ')}`, 400, formattedErrors));
            }
            return next(new ErrorHandler('Validation error', 400, formattedErrors));
        }
        return next(new ErrorHandler('Invalid request', 400));
    }
};

export default validateRequest;
