import { Router } from "express";
import UserController from "../controllers/UserController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("/createUser", UserController.createUser);
apiRouter.post("/signUp", authenticateIdToken, UserController.signUp);

export default apiRouter;

