import { Router } from "express";
import UserController from "../controllers/UserController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("/create-user", UserController.createUser);

apiRouter.get(
  "/current-user",
  authenticateIdToken,
  UserController.getCurrentUser
);
apiRouter.post(
  "/sign-up",
  authenticateIdToken,
  UserController.signUp
);

export default apiRouter;

