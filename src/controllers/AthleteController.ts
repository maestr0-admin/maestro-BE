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
  hometowns?: string;
  schools?: string;
  followerMinimum?: number;
  followerMaximum?: number;
  sports?: string;
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
    let { hometowns, schools, sports, followerMaximum, followerMinimum } =
      req.query;
    if (hometowns && typeof hometowns === "string")
      hometowns = JSON.parse(hometowns);
    if (sports && typeof sports === "string") sports = JSON.parse(sports);
    if (schools && typeof schools === "string") schools = JSON.parse(schools);

    let filter: FilterQuery<IAthleteProfile> = {};

    if (hometowns?.length) {
      filter.hometown = { $in: hometowns };
    }
    if (sports?.length) {
      filter.sport = { $in: sports };
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

    const totalCount = await Athlete.count(filter);
    const totalPage = Math.ceil(totalCount / limit);

    return res
      .status(200)
      .json({ athletes: { data: athletes, totalPage, totalCount } });
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
              sport: "$sport",
            },
          },
        },
      ]);
      const schools = [];
      const hometowns = [];
      const tags = [];
      const sports = [];
      for (const value of data) {
        schools.push(value._id.school);
        hometowns.push(value._id.hometown);
        tags.push(value._id.tags);
        sports.push(value._id.sport);
      }
      return res.status(200).json({
        schools,
        hometowns,
        tags: [...new Set(tags.flat(Infinity))],
        sports: [...new Set(sports.flat(Infinity))],
      });
    } catch (err: any) {
      return sendValidationError(res, err);
    }
  }
}

export default new AthleteController();
