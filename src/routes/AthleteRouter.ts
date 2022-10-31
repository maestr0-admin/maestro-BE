import { Router } from "express";
import AthleteController from "../controllers/AthleteController";

const apiRouter = Router();

apiRouter.post("", AthleteController.createAthlete);

apiRouter.get("", AthleteController.getAthlete);

export default apiRouter;
