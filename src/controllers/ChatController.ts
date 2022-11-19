import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import messageRoom from "../models/MessageRoom";
import User from "../models/User";
import IAuthLocals from "../types/AuthLocals";

class ChatController {
  async createChat(
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
    const { uid: currentUserId } = res.locals.user;
    try {
      const user = await User.findOne({ uid: id });
      const currentUser = await User.findOne({ uid: currentUserId });

      if (!user || !currentUser)
        return res.status(404).json({
          message: "User not found",
        });

      //check if chat already exists
      let chatDoc = await messageRoom.findOne({
        participants: {
          $all: [currentUser._id, user._id],
        },
      });

      if (chatDoc) {
        return res.status(200).json({
          message: "Chat already exists",
        });
      }

      const chat = await messageRoom.create({
        participants: [currentUser._id, user._id],
      });

      return res.status(201).json({
        id: chat._id,
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }

  async getChats(req: Request, res: Response<any, IAuthLocals>) {
    const { uid } = res.locals.user;

    const user = await User.findOne({ uid });
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let chatDoc = await messageRoom.find({
      participants: {
        $in: [user?._id],
      },
    });
    return res.status(200).json([
      ...chatDoc.map((chat) => {
        return {
          id: chat._id,
          participants: chat.participants,
        };
      }),
    ]);
  }
}

export default new ChatController();
