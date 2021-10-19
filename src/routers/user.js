import express from "express";
import {
  authentication,
  changePassword,
  createUser,
  deleteUser,
  getInfo,
  getList,
  login,
  resetPassword,
  updateUser,
} from "../controllers/user.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

// @route USER user/create
// @desc create new user
// @access root
router.post("/create", authToken, authAdmin, createUser);

// @route USER user/reset-password
// @desc reset user password
// @access root
router.put("/reset-password", authToken, authAdmin, resetPassword);

// @route USER user/authentication
// @desc verify your account after successful registration
// @access: gmail account received
router.get("/authentication", authentication);

// @route USER user/login
// @desc login
// @access public
router.post("/login", login);

// @route USER user/info
// @desc info
// @access: has access_token
router.get("/info", authToken, getInfo);

// @route USER user/list
// @desc list user
// @access root
router.get("/list", authToken, authAdmin, getList);

// @route USER user/change-password
// @desc change password
// @access: has access_token
router.put("/change-password", authToken, changePassword);

// @route USER user/delete
// @desc delete 1 or many user
// @access: root
router.delete("/delete", authToken, authAdmin, deleteUser);

// @route USER user/update
// @desc update user
// @access: root
router.put("/update/:id", authToken, authAdmin, updateUser);

export default router;
