import { Router } from "express";
import AthleteController from "../controllers/AthleteController";

const apiRouter = Router();

apiRouter.post("", AthleteController.createAthlete);

apiRouter.get("", AthleteController.getAthletes);

apiRouter.get("/filters", AthleteController.getFiltersData);

export default apiRouter;
