import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import "./src/config/configureFirebase";
import apiRouter from "./src/routes/ApiRouter";
import athleteRouter from "./src/routes/AthleteRouter";
import chatRouter from "./src/routes/ChatRouter";
import cors from "cors";

const port = process.env.PORT;

const app: Express = express();

app.use(express.json());

const corsOptions = {
  origin: "https://maestro-zeta.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());
app.use("/api", apiRouter);
app.use("/api/athlete", athleteRouter);
app.use("/api/chat", chatRouter);

// // Create an HTTP service.
// http.createServer(app).listen(port);
// // Create an HTTPS service identical to the HTTP service.
// // https.createServer(options, app).listen(port);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
