import { Router } from "express";
import AthleteController from "../controllers/AthleteController";

const apiRouter = Router();

apiRouter.post("/create-athlete", AthleteController.createAthlete);



export default apiRouter;
