import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

/**
 ** error handling for request validation errors
 */
export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid logging params values');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
    // serialize errors to common structure
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param } 
        });
    }
}