import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

/**
 ** Middleware for error handling and serialization of the errors to common structure
 */
export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("Something went wrong", err);
	// Checks for errors and serialize them
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}
	// If it is not know error send 'Something went wrong'
	res.status(400).send({
		errors: [{ message: "Something went wrong" }],
	});
};
