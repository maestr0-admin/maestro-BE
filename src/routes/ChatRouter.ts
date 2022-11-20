import { Router } from "express";
import ChatController from "../controllers/ChatController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("", authenticateIdToken, ChatController.createRoom);
apiRouter.get("", authenticateIdToken, ChatController.getMessageRooms);

apiRouter.get("/message/:id", authenticateIdToken, ChatController.getMessages);
apiRouter.post("/message", authenticateIdToken, ChatController.sendMessage);

export default apiRouter;
