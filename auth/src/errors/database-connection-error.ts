import { CustomError } from "./custom-errors";

/**
 ** error handling for database connection error
 */
export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = 500;

    constructor() {
        super('Error connecting to DB');
        // needed when extending build in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    // serialize errors to common structure
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}