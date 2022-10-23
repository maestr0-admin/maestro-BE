import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import "./src/config/configureFirebase";
import apiRouter from "./src/routes/ApiRouter";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

var options = {
  key: fs.readFileSync(path.join(__dirname, "./key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./cert.pem")),
  requestCert: false,
  rejectUnauthorized: false
};
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api", apiRouter);

// // Create an HTTP service.
// http.createServer(app).listen(port);
// // Create an HTTPS service identical to the HTTP service.
// // https.createServer(options, app).listen(port);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

