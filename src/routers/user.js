import express from "express";
import { createUser, login, info } from "../controllers/user.js";

const router = express.Router();

// @route USER user/create
// @desc create new user
// @access root
router.post("/create", createUser);

// @route USER user/login
// @desc login
// @access public
router.post("/login", login);

// @route USER user/info
// @desc info
// @access public
router.get("/info", info);

export default router;
