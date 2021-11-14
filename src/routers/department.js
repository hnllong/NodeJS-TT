import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getListDepartment,
  readDepartment,
  updateDepartment,
  listUserDepartment,
  exportStaffList,
} from "../controllers/department.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { authToken } from "../middleware/authToken.js";
import { managerMiddleware } from "../middleware/managerMiddleware.js";

const router = express.Router();

// @route DEPARTMENT department/list
// @desc get list department
// @access root
router.post("/list", authToken, authAdmin, getListDepartment);

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

// @route DEPARTMENT department/list-user
// @desc list user in this department
// @access manager,root
router.get("/list-user", authToken, managerMiddleware, listUserDepartment);

// @route DEPARTMENT department/export-staff-list
// @desc export list staff to excel file
// @access manager
router.get("/export-staff-list", authToken, managerMiddleware, exportStaffList);

export default router;
