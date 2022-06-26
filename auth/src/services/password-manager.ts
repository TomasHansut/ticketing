import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

/**
 ** Class for async hashing and comparing passwords
 */
export class PasswordManager {
	// Password hashing function
	static async toHash(password: string) {
		const salt = randomBytes(8).toString("hex");
		const buf = (await scryptAsync(password, salt, 64)) as Buffer;

		return `${buf.toString("hex")}.${salt}`;
	}
	// Compare stored password with supplied password
	static async compare(storedPassword: string, suppliedPassword: string) {
		const [hashedPassword, salt] = storedPassword.split(".");
		const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

		return buf.toString("hex") === hashedPassword;
	}
}
