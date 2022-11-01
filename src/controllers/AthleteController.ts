import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import Athletes from "../models/Athletes";
import IAthleteProfile from "../types/AthleteProfile";
import IAuthLocals from "./../types/AuthLocals";

interface GetAtletesQuery {
  page?: string;
  limit?: string;
  /*   minFollowers?: string;
  maxFollowers?: string; */
  hometown?: string;
  school?: string;
  /*   tags?: string;
  skillsAndInterests?: string; */
}

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

  async getAthletes(req: Request<{}, {}, {}, GetAtletesQuery>, res: Response) {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 3);
    const { hometown, school } = req.query;

    const athletes = await Athletes.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);


    const totalCount = await Athletes.count();
    const totalPage = Math.ceil(totalCount / limit);

    return res.status(200).json({ athletes: { data: athletes, totalPage } });
  }

  async getFiltersData(req: Request, res: Response<any, IAuthLocals>) {
    try {
      const data = await Athletes.aggregate([
        {
          $group: {
            _id: {
              school: "$school",
              hometown: "$hometown",
              tags: "$tags",
              skillsAndInterests: "$skillsAndInterests",
            },
          },
        },
      ]);
      const schools = [];
      const hometowns = [];
      const tags = [];
      const skillsAndInterests = [];
      for (const value of data) {
        schools.push(value._id.school);
        hometowns.push(value._id.hometown);
        tags.push(value._id.tags);
        skillsAndInterests.push(value._id.skillsAndInterests);
      }
      return res.status(200).json({
        schools,
        hometowns,
        tags: [...new Set(tags.flat(Infinity))],
        skillsAndInterests: [...new Set(skillsAndInterests.flat(Infinity))],
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }
}

export default new AthleteController();
