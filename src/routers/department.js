import express from "express";
import {
  createDepartment,
  deleteDepartment,
  readDepartment,
  updateDepartment,
} from "../controllers/department.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

// @route DEPARTMENT department/create
// @desc create new department
// @access root
router.post("/create", authToken, authAdmin, createDepartment);

// @route DEPARTMENT department/update
// @desc update department
// @access root
router.put("/update/:id", authToken, authAdmin, updateDepartment);

// @route DEPARTMENT department/delete
// @desc delete department
// @access root
router.delete("/delete/:id", authToken, authAdmin, deleteDepartment);

// @route DEPARTMENT department/read
// @desc read department
// @access root
router.get("/read/:id", authToken, authAdmin, readDepartment);

export default router;
