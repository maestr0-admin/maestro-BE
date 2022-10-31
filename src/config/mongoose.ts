import mongoose from "mongoose";
import dotenv from "dotenv";

const connection = process.env.MONGODB_CONNECTION_STRING_TEST!;

mongoose
  .connect(connection, {
    dbName: "maestro",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("hata burada")
  });

