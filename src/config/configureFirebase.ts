import { initializeApp, cert } from "firebase-admin/app";
import * as dev from "./dev.json";
import "firebase-admin/auth";

const app = initializeApp({
  //@ts-ignore
  credential: cert(dev),
});

