import { Request, Response } from "express";
import User from "../models/User";
import IAuthLocals from "../types/AuthLocals";
import Athlete from "../models/Athlete";
import Brand from "../models/Brand";

class FavoriteAthleteController {
  async updateFavoriteAthletes(
    req: Request<
      {},
      any,
      {
        athleteId: string;
      }
    >,
    res: Response<any, IAuthLocals>
  ) {
    const { uid } = res.locals.user;
    const { athleteId } = req.body;

    const athlete = await Athlete.findById(athleteId);

    if (!athlete) {
      return res.status(401).send({
        code: "athlete_not_found",
        message: "Athlete not found",
      });
    }

    const isFavorite = await User.findOne({
      uid,
      favoriteAthletes: {
        $in: {
          _id: athleteId,
        },
      },
    });

    const user = await User.findOneAndUpdate(
      {
        uid,
      },
      {
        [isFavorite ? "$pull" : "$push"]: {
          favoriteAthletes: athleteId,
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(401).send({
        code: "user_not_found",
        message: "User not found",
      });
    }

    if (user.type === "brand") {
      const profile = await Brand.findById(user.profileId);
      if (profile) {
        user.name = profile.name;
      }
      const athletes = await Athlete.find({
        _id: {
          $in: user.favoriteAthletes,
        },
      });
      user.favoriteAthletes = athletes;
    }

    return res.status(200).json({
      user,
    });
  }
}

export default new FavoriteAthleteController();
