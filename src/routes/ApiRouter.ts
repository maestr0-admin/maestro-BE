import { Router } from "express";
import UserController from "../controllers/UserController";
import { upload } from "../helpers/awsController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";
import IUser from "../types/User";

const apiRouter = Router();

apiRouter.post("/createUser", UserController.createUser);
apiRouter.post("/signUp", authenticateIdToken, UserController.signUp);

export default apiRouter;

