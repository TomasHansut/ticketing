import { CustomError } from "./custom-errors";

/**
 ** Error handling for 404
 ** Extentds abstract class CustomError
 */
export class NotFoundError extends CustomError {
    reason = 'Not Found'
    statusCode = 404;

    constructor() {
        super('Route not found');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    // Serialize errors to common structure
    serializeErrors = () => {
        return [{ message: this.reason }];
    }
}