import mongoose from "mongoose";
import { environment } from "../config/index.js";

const connectionString =
  "mongodb+srv://hnlong:long44227029@cluster0.ltragyj.mongodb.net/";

// export const connectionMongodb = () => {
//   mongoose
//     .connect(
//       `mongodb+srv://${environment.mongo_db.user}:${environment.mongo_db.password}@cluster0.tdbxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => {
//       console.log("Connected to DB");
//     })
//     .catch((err) => {
//       console.log("err", err);
//     });
// };

export const connectionMongodb = () => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MONGO-DB-IMAGE");
    })
    .catch((err) => {
      console.log("err", err);
    });
};
