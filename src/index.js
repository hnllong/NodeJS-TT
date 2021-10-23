import cors from "cors";
import express from "express";
import { connectionMongodb, environment } from "./config/index.js";
import file from "./routers/file.js";
import user from "./routers/user.js";

const app = express();
const PORT = environment.config.port;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

connectionMongodb();

app.use("/api/v1/user", user);
app.use("/api/v1/file", file);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
