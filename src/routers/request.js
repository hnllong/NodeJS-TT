import express from "express";
import {
  acceptRequest,
  createRequest,
  getUserList,
  refuseRequest,
  getMemberList,
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
router.put("/accept/:id", authToken, requestMiddleware, acceptRequest);

// @route REQUEST request/refuse
// @desc update status request (status: 2)
// @access manager, admin
router.put("/refuse/:id", authToken, requestMiddleware, refuseRequest);

// @route REQUEST request/user-list
// @desc get list request of user
// @access has access_token
router.get("/user-list", authToken, getUserList);

// @route REQUEST request/member-list
// @desc get all request for root, git all request of department
// @access root, manager
router.get("/member-list", authToken, requestMiddleware, getMemberList);

export default router;
