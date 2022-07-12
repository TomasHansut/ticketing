import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from 'jsonwebtoken';

declare global {
	var getCookie: () => string[];
}

let mongo: any;
// Hook witch will run before all tests
beforeAll(async () => {
	process.env.JWT_KEY = "qweqwe";

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri);
});

// Run before each test
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	// delete data from all collections
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

// Run after all tests are completed
afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.getCookie = () => {
	// Build a JWT payload
	const payload = {
		id: '12312231asdasd',
		email: 'test@test.com'
	}

	// Create JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build session Object
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// return a string thats the cookie with the encoded data
	return [`session=${base64}`];
};
