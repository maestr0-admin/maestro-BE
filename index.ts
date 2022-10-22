import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import "./src/config/configureFirebase";
import apiRouter from "./src/routes/ApiRouter";
import cors from 'cors'
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
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

