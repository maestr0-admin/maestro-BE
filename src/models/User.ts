import { Schema, model, connect } from "mongoose";
import IUser from "../types/User";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    type: { type: String, required: true },
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    uid: { type: String, required: true, unique: true },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;

