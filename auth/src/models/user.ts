import mongoose from "mongoose";
import { PasswordManager } from "../services/password-manager";

// An interface that discribes the properties
// that are required to create a new User
interface UserAttrs {
	email: string;
	password: string;
}

// An Interface that discribes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An Interface that discribes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}},{
	toJSON: {
		// Change response from "_id" to "id"
		// Delete password, version key and _id from response 
		transform(doc, ret) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		}
	}
});

// User Document before saving
userSchema.pre("save", async function (done) {
	// isModified returns true even if is newly created
	if (this.isModified("password")) {
		const hashed = await PasswordManager.toHash(this.get("password"));
		this.set("password", hashed);
	}
    done();
});

// adds build property for User
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// need to add this for TS to understand schema

export { User };
