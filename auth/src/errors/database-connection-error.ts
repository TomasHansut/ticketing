import { CustomError } from "./custom-errors";

/**
 ** Error handling for database connection
 ** Extentds abstract class CustomError
 */
export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = 500;

    constructor() {
        super('Error connecting to DB');
        // Needed when extending build in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    // Serialize errors to common structure
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}