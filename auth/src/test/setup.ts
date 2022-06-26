import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
	var getCookie: () => Promise<string[]>;
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

global.getCookie = async () => {
	const email = "test@test.com";
	const password = "password";

	const response = await request(app)
		.post("/api/users/signup")
		.send({
			email,
			password,
		})
		.expect(201);

	const cookie = response.get("Set-Cookie");

	return cookie;
};
