import { Request, Response } from "express";

function extractIdToken(req: Request) {
  const idToken = req.headers.authorization!.split(" ")[1];
  return idToken;
}

function sendValidationError(res: Response<any>, err: any) {
  console.log(err.name);
  if (err.name === "ValidationError") {
    console.error("Error Validating!", err);
    return res.status(422).json(err);
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({
      message: Object.keys(err.keyValue)[0] + " already exists.",
    });
  } else {
    console.error(err);
    return res.status(500).json(err);
  }
}

export { extractIdToken, sendValidationError };

