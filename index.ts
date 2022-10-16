import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import './src/config/configureFirebase'
import apiRouter from "./src/routes/ApiRouter";
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());


app.use('/api',apiRouter)
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

