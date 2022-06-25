import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
    reason = 'Not Found'
    statusCode = 404;

    constructor() {
        super('Route not found');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors = () => {
        return [{ message: this.reason }];
    }
}