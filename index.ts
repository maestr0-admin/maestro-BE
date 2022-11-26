import express, { Express, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import "./src/config/mongoose";
import "./src/config/configureFirebase";
import apiRouter from "./src/routes/ApiRouter";
import athleteRouter from "./src/routes/AthleteRouter";
import brandRouter from "./src/routes/BrandRouter";
import chatRouter from "./src/routes/ChatRouter";
import contractRouter from "./src/routes/ContractRouter";
import cors from "cors";
import socket from "./src/utils/socket";

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
app.use("/api/brand", brandRouter);
app.use("/api/chat", chatRouter);
app.use("/api/contract", contractRouter);

// // Create an HTTP service.
const server = http.createServer(app).listen(9000, () => {
  console.log(`⚡️[socket]: listening on http://localhost:9000`);
});

const io = new Server(server, {
  cors: {
    origin: "localhost:3000",
  },
});

//@ts-ignore
socket(io);
// // Create an HTTPS service identical to the HTTP service.
// // https.createServer(options, app).listen(port);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
