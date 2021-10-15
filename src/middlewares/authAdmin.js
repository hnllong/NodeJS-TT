import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();

const authAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.user.userId,
    });
    if (user.roleId !== 0) {
      // status 400
      return res
        .status(200)
        .json({ success: false, message: "Admin access denied" });
    }
    next();
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal server error" });
  }
};

export { authAdmin };
