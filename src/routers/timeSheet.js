import express from "express";
import {
  checkIn,
  checkOut,
  getList,
  getWorkDate,
} from "../controllers/timeSheet.js";
import { authToken } from "../middleware/authToken.js";
import { managerMiddleware } from "../middleware/managerMiddleware.js";

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

// @route REQUEST timesheet/work-date
// @desc get list work date of users
// @access manager
router.post("/work-date/:id", authToken, managerMiddleware, getWorkDate);

export default router;
