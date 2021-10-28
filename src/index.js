import cors from "cors";
import express from "express";
import { connectionMongodb, environment } from "./config/index.js";
import department from "./routers/department.js";
import file from "./routers/file.js";
import request from "./routers/request.js";
import timeSheet from "./routers/timeSheet.js";
import user from "./routers/user.js";

const app = express();
const PORT = environment.config.port;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

connectionMongodb();

app.use("/api/v1/user", user);
app.use("/api/v1/file", file);
app.use("/api/v1/department", department);
app.use("/api/v1/request", request);
app.use("/api/v1/timesheet", timeSheet);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
