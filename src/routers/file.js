import handleFile from "../middleware/handleFile.js";
import express from "express";
import { uploadFile, readFile, deleteFile } from "../controllers/file.js";

const router = express.Router();

// @route FILE file/update
// @desc upload avatar
// @access root
router.post("/upload", handleFile.single("file"), uploadFile);

// @route FILE file/:filename
// @desc view avatar
// @access has access_token
router.get("/:filename", readFile);

// @route FILE file/:filename
// @desc delete avatar
// @access root
router.delete("/:filename", deleteFile);

export default router;
