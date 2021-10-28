import express from "express";
import { deleteFile, readFile, uploadFile } from "../controllers/file.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { authToken } from "../middleware/authToken.js";
import handleFile from "../middleware/handleFile.js";

const router = express.Router();

// @route FILE file/update
// @desc upload avatar
// @access has access_token
router.post("/upload", authToken, handleFile.single("file"), uploadFile);

// @route FILE file/:filename
// @desc view avatar
// @access has access_token
router.get("/:filename", readFile);

// @route FILE file/:filename
// @desc delete avatar
// @access has access_token
router.delete("/:filename", authToken, deleteFile);

export default router;
