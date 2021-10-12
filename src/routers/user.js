import express from "express";
import { createUser, getInfo, getList, login } from "../controllers/user.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authToken } from "../middlewares/authToken.js";

const router = express.Router();

// @route USER user/create
// @desc create new user
// @access root
router.post("/create", authToken, authAdmin, createUser);

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
