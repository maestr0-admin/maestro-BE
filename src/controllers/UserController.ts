import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import User from "../models/User";
import IAuthLocals from "../types/AuthLocals";
import IUser from "../types/User";

class UserController {
  async createUser(
    req: Request<{}, any, IUser>,
    res: Response<any, IAuthLocals>
  ) {
    const userObj = req.body;
    try {
      await User.create({
        ...userObj,
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }

    return res.status(200).json({
      message: "User created",
    });
  }

  async getCurrentUser(
    req: Request<{}, any, IUser>,
    res: Response<any, IAuthLocals>
  ) {
    const { phone, uid, email } = res.locals.user;
    let userDoc = await User.findOne({
      uid,
    });
    return res.status(200).json({
      user: userDoc,
    });
  }

  async signUp(
    req: Request<{}, any, { accountType: "athlete" | "brand" }>,
    res: Response<any, IAuthLocals>
  ) {
    const { phone, uid, email } = res.locals.user;
    console.log(res.locals.user)
    console.log('res.locals.user')
    const { accountType } = req.body;
    if (accountType === "athlete") {
      let userDoc = await User.findOne({
        phoneNumber: phone,
      });
      if (!userDoc) {
        return res.status(401).send({
          code: "phone_not_found",
          message: "Phone number is not added by admins",
        });
      }
      await userDoc.updateOne({
        $set: {
          uid,
          phoneNumber: phone,
          type: "athlete",
        },
      });
    } else {
      await User.create({
        email,
        uid,
        type: "brand",
      });
    }

    return res.status(200).send({
      code: "sign_up_success",
      message: "Sign up successfull",
    });
  }
}

export default new UserController();

