import mongoose from "mongoose";
import { environment } from "../config/index.js";

export const connectionMongodb = () => {
  mongoose
    .connect(
      `mongodb+srv://${environment.mongo_db.user}:${environment.mongo_db.password}@cluster0.tdbxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("err", err);
    });
};
