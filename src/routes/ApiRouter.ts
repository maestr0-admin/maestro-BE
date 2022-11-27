import { Router } from "express";
import UserController from "../controllers/UserController";
import { upload } from "../helpers/awsController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("/create-user", UserController.createUser);

apiRouter.get(
  "/current-user",
  authenticateIdToken,
  UserController.getCurrentUser
);
apiRouter.post("/sign-up", authenticateIdToken, UserController.signUp);

apiRouter.post("/test", upload, (req, res) => {
  console.log(req.file);
  console.log("req.file");
  res.send("a");
});

export default apiRouter;
