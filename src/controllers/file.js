import Grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

export const uploadFile = async (req, res) => {
  try {
    if (req.file === undefined)
      return res
        .status(200)
        .json({ success: false, message: "You must select a file." });

    const imgUrl = `http://localhost:5000/api/v1/file/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: "File upload successfully",
      data: imgUrl,
    });
  } catch (error) {
    console.log("[ERROR UPLOAD FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const readFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.log("[ERROR READ FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the file",
    });
  } catch (error) {
    console.log("[ERROR DELETE FILE] ", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
