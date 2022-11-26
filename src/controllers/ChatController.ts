import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import MessageRoom from "../models/MessageRoom";
import Message from "../models/Message";
import User from "../models/User";
import IAuthLocals from "../types/AuthLocals";
import IMessage from "../types/Message";
import IMessageRoom from "../types/MessageRoom";

class ChatController {
  async createRoom(
    req: Request<
      {},
      any,
      {
        id: string;
      }
    >,
    res: Response<any, IAuthLocals>
  ) {
    const { id } = req.body;
    const { uid } = res.locals.user;
    try {
      const receiver = await User.findOne({ uid: id });
      const user = await User.findOne({ uid });

      if (!receiver || !user)
        return res.status(404).json({
          message: "User not found",
        });

      let exists = await MessageRoom.findOne({
        participants: {
          $all: [user._id, receiver._id],
        },
      });

      if (exists) {
        return res.status(200).json({
          message: "Chat already exists",
        });
      }

      await MessageRoom.create({
        participants: [user._id, receiver._id],
      });

      return res.status(201).json({
        message: "Chat created",
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }

  async getMessageRooms(
    req: Request<{}, any, IMessageRoom[]>,
    res: Response<any, IAuthLocals>
  ) {
    try {
      const { uid } = res.locals.user;

      const user = await User.findOne({ uid });
      if (!user)
        return res.status(404).json({
          message: "User not found",
        });

      //update date nessasary for sorting

      const rooms = await MessageRoom.find({
        participants: {
          $in: [user._id],
        },
      })
        .populate("participants")
        .sort({ updatedAt: -1 });

      const response: IMessageRoom[] = rooms.map((room) => {
        return {
          id: room._id.toString(),
          participants: room.participants,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      });

      return res.status(200).json(response);
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }

  async getMessages(
    req: Request<
      {
        id: string;
      },
      IMessage
    >,
    res: Response<any, IAuthLocals>
  ) {
    try {
      const { id } = req.params;
      const { uid } = res.locals.user;

      const user = await User.findOne({ uid });

      if (!user)
        return res.status(404).json({
          message: "User not found",
        });

      const room = await MessageRoom.findOne({
        _id: id,
      });

      if (!room)
        return res.status(404).json({
          message: "Chat not found",
        });

      const messages = await Message.find({
        messageRoomId: room._id,
      });

      const response: IMessage[] = messages.map((message) => {
        return {
          id: message._id.toString(),
          messageRoomId: message.messageRoomId.toString(),
          message: message.message,
          sender: message.sender,
          receiver: message.receiver,
          createdAt: message.createdAt,
        } as IMessage;
      });

      return res.status(200).json(response);
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }

  async sendMessage(
    req: Request<
      {},
      IMessage,
      {
        id: string;
        message: string;
      }
    >,
    res: Response<any, IAuthLocals>
  ) {
    try {
      const { uid } = res.locals.user;
      const { id, message } = req.body;

      const user = await User.findOne({ uid });

      if (!user)
        return res.status(404).json({
          message: "User not found",
        });

      const room = await MessageRoom.findOne({
        _id: id,
        participants: {
          $in: [user._id],
        },
      });

      if (!room)
        return res.status(404).json({
          message: "Chat not found",
        });

      const newMessage = await Message.create({
        messageRoomId: room._id,
        message,
        sender: user._id,
        receiver: room.participants.filter(
          (participant) => participant !== user._id.toString()
        )[0],
      });

      return res.status(201).json({
        id: newMessage._id.toString(),
        messageRoomId: newMessage.messageRoomId.toString(),
        message: newMessage.message,
        sender: newMessage.sender,
        receiver: newMessage.receiver,
        createdAt: newMessage.createdAt,
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }
}

export default new ChatController();
