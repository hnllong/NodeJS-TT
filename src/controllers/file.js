import fs from "fs";
import util from "util";
import {
  getFileStream,
  uploadImage,
  removeFileStream,
} from "../services/aws.js";

const unlinkFile = util.promisify(fs.unlink);

export const uploadFile = async (req, res) => {
  try {
    if (req.file === undefined)
      return res
        .status(200)
        .json({ success: false, message: "You must select a file." });

    const result = await uploadImage(req.file);

    await unlinkFile(req.file.path);

    return res.status(200).json({
      success: true,
      message: "File upload successfully",
      data: `/images/${result.Key}`,
    });
  } catch (error) {
    console.log("[ERROR UPLOAD FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const readFile = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  } catch (error) {
    console.log("[ERROR READ FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await removeFileStream(req.params.key);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the file",
    });
  } catch (error) {
    console.log("[ERROR DELETE FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
