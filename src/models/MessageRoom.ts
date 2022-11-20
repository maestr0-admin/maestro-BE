import { Schema, model } from "mongoose";
import IMessageRoom from "../types/MessageRoom";

const messageRoomSchema = new Schema<IMessageRoom>(
  {
    participants: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const messageRoom = model<IMessageRoom>("MessageRoom", messageRoomSchema);

export default messageRoom;
