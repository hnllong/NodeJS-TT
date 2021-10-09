import express from "express";
import { createUser, getListUser, login } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);

// @route USER user/create-user
// @desc create new user
// @access root
router.post("/create-user", createUser);

router.get("/list-user", getListUser);

export default router;
