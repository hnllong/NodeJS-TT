import express from "express";
import { createUser, login, getInfo, getList } from "../controllers/user.js";
import { authToken } from "../middlewares/authToken.js";

const router = express.Router();

// @route USER user/create
// @desc create new user
// @access root
router.post("/create", authToken, createUser);

// @route USER user/login
// @desc login
// @access public
router.post("/login", login);

// @route USER user/info
// @desc info
// @access public
router.get("/info", authToken, getInfo);

// @route USER user/list
// @desc list user
// @access root
router.get("/list", authToken, getList);

export default router;
