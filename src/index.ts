import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";

const port = 5001;
import { MONGO_URI } from "./constants/__CONSTANTS__";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key dose not exist");
  }
  try {
    await mongoose.connect(`${MONGO_URI}`);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`Main Route on ${port}!!!!`);
  });
};

start();
