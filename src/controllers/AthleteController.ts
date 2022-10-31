import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import Athletes from "../models/Athletes";
import IAthleteProfile from "../types/AthleteProfile";

class AthleteController {
  async createAthlete(
    req: Request<{}, any, IAthleteProfile>,
    res: Response<any, IAthleteProfile>
  ) {
    const athleteObj = req.body;
    try {
      await Athletes.create({
        ...athleteObj,
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
    return res.status(200).json({
      message: "Athlete created",
    });
  }

  async getAthlete(
    req: Request<{}, any, IAthleteProfile>,
    res: Response<any, IAthleteProfile>
  ) {
    let athleteDoc = await Athletes.find();
    return res.status(200).json({
      athlete: athleteDoc,
    });
  }
}

export default new AthleteController();
