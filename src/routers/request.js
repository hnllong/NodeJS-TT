import express from "express";
import {
  acceptRequest,
  createRequest,
  refuseRequest,
} from "../controllers/request.js";
import { authToken } from "../middleware/authToken.js";
import { requestMiddleware } from "../middleware/requestMiddleware.js";

const router = express.Router();

// @route REQUEST request/create
// @desc create new request
// @access staff, manager
router.post("/create", authToken, createRequest);

// @route REQUEST request/accept
// @desc update status request (status: 1)
// @access manager, admin
router.get("/accept", acceptRequest);
// router.get("/accept", authToken, requestMiddleware, acceptRequest);

// @route REQUEST request/refuse
// @desc update status request (status: 2)
// @access manager, admin
router.get("/refuse", refuseRequest);
// router.get("/refuse", authToken, requestMiddleware, refuseRequest);

export default router;
