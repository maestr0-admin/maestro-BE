import AWS from "aws-sdk";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT!);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const upload = multer({
  storage: multerS3({
    bucket: process.env.DO_SPACES_NAME!,
    //@ts-ignore
    s3,
    acl: "public-read",
    key: (req, file, cb) => {
      console.log(file);
      console.log("file");
      const extension = file.mimetype.split("/")[1];
      const key = `${file.originalname}`;
      cb(null, key);
    },
  }),
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }

    cb(null, true);
  },
}).single("File");

export { upload };
