import express from "express";
import multer from "multer";
import { readFile, uploadFile, deleteFile } from "../controllers/file.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

// @route FILE file/update
// @desc upload avatar
// @access has access_token
router.post("/upload", authToken, multer().single("file"), uploadFile);

// @route FILE file/:filename
// @desc view avatar
// @access has access_token
router.get("/:key", readFile);

// @route FILE file/:filename
// @desc delete avatar
// @access has access_token
router.delete("/:key", authToken, deleteFile);

export default router;
