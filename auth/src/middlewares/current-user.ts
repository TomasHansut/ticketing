import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
}

// Add prop that might be define to res.req
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

/**
 ** Middleware to get current user is logged and have valid jwt tokken
 *
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// If session or jwt is undefiened return null
	if (!req.session?.jwt) {
		return next();
	}

	// Check if Jwt tokken is legit
	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		req.currentUser = payload;
	} catch (err) {}
	next();
};
