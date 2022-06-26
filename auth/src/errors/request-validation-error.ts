import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

/**
 ** Error handling for request validation
 ** Extentds abstract class CustomError
 */
export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid logging params values');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
    // Serialize errors to common structure
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param } 
        });
    }
}