import { Router } from "express";
import ContractController from "../controllers/ContractController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.get("/", authenticateIdToken, ContractController.getUserContracts);
apiRouter.post("", authenticateIdToken, ContractController.createContract);

export default apiRouter;
