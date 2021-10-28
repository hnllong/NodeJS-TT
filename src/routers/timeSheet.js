import express from "express";
import { checkIn, checkOut } from "../controllers/timeSheet.js";
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

export default router;
