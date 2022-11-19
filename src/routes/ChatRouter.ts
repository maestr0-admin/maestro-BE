import { Router } from "express";
import ChatController from "../controllers/ChatController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("", authenticateIdToken, ChatController.createChat);

apiRouter.get("", authenticateIdToken, ChatController.getChats);

export default apiRouter;
