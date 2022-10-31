import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import "./src/config/configureFirebase";
import apiRouter from "./src/routes/ApiRouter";
import athleteRouter from "./src/routes/AthleteRouter";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

const port = process.env.PORT;

const app: Express = express();
app.use(express.json());


const corsOptions = {
  origin: "https://maestro-zeta.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api", apiRouter);
app.use("/api/athlete", athleteRouter);

// // Create an HTTP service.
// http.createServer(app).listen(port);
// // Create an HTTPS service identical to the HTTP service.
// // https.createServer(options, app).listen(port);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
