import { Router } from "express";
import UserAthleteController from "../controllers/FavoriteAthleteController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post(
  "",
  authenticateIdToken,
  UserAthleteController.updateFavoriteAthletes
);

export default apiRouter;
