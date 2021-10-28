import express from "express";
import { checkIn, checkOut, getList } from "../controllers/timeSheet.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

// @route REQUEST timesheet/check-in
// @desc check in
// @access staff, manager
router.post("/check-in", authToken, checkIn);

// @route REQUEST timesheet/check-out/:id
// @desc check out
// @access staff, manager
router.put("/check-out/:id", authToken, checkOut);

// @route REQUEST timesheet/list
// @desc list check-in check-out of user
// @access has access_token
router.get("/list", authToken, getList);

export default router;
