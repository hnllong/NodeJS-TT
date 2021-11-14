import {
  getFileStream,
  removeFileStream,
  uploadImage,
} from "../services/aws.js";

export const uploadFile = async (req, res) => {
  try {
    if (req.file === undefined)
      return res
        .status(200)
        .json({ success: false, message: "You must select a file." });

    const result = await uploadImage(req.file);

    return res.status(200).json({
      success: true,
      message: "File upload successfully",
      data: `http://localhost:5000/api/v1/file/${result.Key}`,
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
