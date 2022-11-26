import { Router } from "express";
import BrandController from "../controllers/BrandController";
import { authenticateIdToken } from "../middlewares/firebaseMiddlewares";

const apiRouter = Router();

apiRouter.post("", authenticateIdToken, BrandController.createBrand);
apiRouter.get("/:id", authenticateIdToken, BrandController.getBrand);
apiRouter.delete("/:id", authenticateIdToken, BrandController.deleteBrand);
apiRouter.put("/:id", authenticateIdToken, BrandController.updateBrand);
apiRouter.post(
  "/upload/backgroundPicture/:id",
  authenticateIdToken,
  BrandController.uploadBackgroundPicture
);

export default apiRouter;
