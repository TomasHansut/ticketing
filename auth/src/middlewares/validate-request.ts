import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

/**
 ** Middleware for validation request
 */
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If any errors throw request validation error
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
};