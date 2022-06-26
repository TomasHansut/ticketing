/**
 * * Abstract class for CustomError that extents build in class of the Error
 * * Point of the class is to serialize errors to common structure 
 */
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        // Needed when extending build in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    // Serialize errors to common structure
    abstract serializeErrors(): { message: string; field?: string }[];
}