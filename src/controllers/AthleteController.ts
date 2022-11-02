import { Request, Response } from "express";
import { sendValidationError } from "../helpers/requestHelpers";
import Athlete from "../models/Athlete";
import IAthleteProfile from "../types/AthleteProfile";
import IAuthLocals from "./../types/AuthLocals";
import queryString from "query-string";
import { FilterQuery } from "mongoose";
interface GetAthletesQuery {
  page?: string;
  limit?: string;
  /*   minFollowers?: string;
  maxFollowers?: string; */
  hometowns?: string;
  schools?: string;
  followerMinimum?: number;
  followerMaximum?: number;
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
      await Athlete.create({
        ...athleteObj,
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
    return res.status(200).json({
      message: "Athlete created",
    });
  }

  async getAthletes(req: Request<{}, {}, {}, GetAthletesQuery>, res: Response) {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 9);
    let { hometowns, schools, followerMaximum, followerMinimum } = req.query;
    if (hometowns && typeof hometowns === "string")
      hometowns = JSON.parse(hometowns);
    if (schools && typeof schools === "string") schools = JSON.parse(schools);

    let filter: FilterQuery<IAthleteProfile> = {};

    if (hometowns?.length) {
      filter.hometown = { $in: hometowns };
    }
    if (schools?.length) {
      filter.school = { $in: schools };
    }
    if (followerMinimum || followerMaximum) {
      filter["instagram.followerCount"] = {
        $gt: followerMinimum ?? 0,
        $lt: followerMaximum ?? Infinity,
      };
    }

    const athletes = await Athlete.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalCount = await Athlete.count();
    const totalPage = Math.ceil(totalCount / limit);

    return res
      .status(200)
      .json({ athletes: { data: athletes, totalPage, hometowns, schools } });
  }

  async getFiltersData(req: Request, res: Response<any, IAuthLocals>) {
    try {
      const data = await Athlete.aggregate([
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
