import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

async function authenticateIdToken(
  req: Request<any>,
  res: Response,
  next: NextFunction
) {
  const idToken = req.headers.authorization?.split(" ")[1];

  if (!idToken)
    return res.status(401).json({ status: "error", code: "unauthorized" });
  try {
    const result = await auth.verifyIdToken(idToken);
    res.locals.user = {
      uid: result.uid,
      phone: result.phone_number,
    };
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ status: "error", code: "unauthorized" });
  }
}

export { authenticateIdToken };

