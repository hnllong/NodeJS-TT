import express from "express";
import { login, createUser, getListUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);

router.post("/create-user", createUser);

router.get("/list-user", getListUser);

export default router;
