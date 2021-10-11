import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import user from "./routers/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// app.get("/api/v1", (req, res) => {
//   res.send("<h2>Hello, This is API docs</h2>");
// });

app.use("/api/v1/user", user);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
