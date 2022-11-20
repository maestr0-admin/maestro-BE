import { Schema, model } from "mongoose";
import IMessage from "../types/Message";

const messageSchema = new Schema<IMessage>(
  {
    messageRoomId: { type: String, required: true },
    message: { type: String },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    audio: { type: String },
  },
  {
    timestamps: true,
  }
);

const message = model<IMessage>("Message", messageSchema);

export default message;
