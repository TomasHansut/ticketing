import { CustomError } from "./custom-errors";

/**
 ** Error handling for bad request 
 ** Extentds abstract class CustomError
 */
export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        // Needed when extending build in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    // Serialize errors to common structure
    serializeErrors() {
        return [{ message: this.message }];
    }
}