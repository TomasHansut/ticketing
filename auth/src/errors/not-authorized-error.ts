import { CustomError } from "./custom-errors";

/**
 ** Error handling for not authorized user
 ** Extentds abstract class CustomError
 */
export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super('Not authorized');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    // Serialize errors to common structure
    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}