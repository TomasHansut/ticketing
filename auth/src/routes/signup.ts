import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@p13577-tickets/common";

import { User } from "../models/user";

const router = express.Router();

/**
 * * Method for signing up user
 */
router.post(
	"/api/users/signup",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// Get email and password from request
		const { email, password } = req.body;

		// Find user with same email adress
		const existingUser = await User.findOne({ email });

		// Check if same user exist
		if (existingUser) {
			throw new BadRequestError("Email in use");
		}

		// Build mongoose User Document with email and password
		const user = User.build({ email, password });

		// Save user to database
		await user.save();

		// Generate jwt token
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);

		// Store it on session object
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as signupRouter };
