import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  address?: string;
  picture?: string;
  role: string
}

const UserSchema = new Schema({
  clerkId: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: String,
  address: String,
  picture: String,
  role: {type: String, default: "user", required: true}
});

const User = models.User || model("User", UserSchema);

export default User;
