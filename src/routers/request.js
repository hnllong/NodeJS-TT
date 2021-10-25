import express from "express";
import { createRequest } from "../controllers/request.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

// @route REQUEST request/create
// @desc create new request
// @access staff, manager
router.post("/create", createRequest);

export default router;
