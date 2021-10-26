import { UserModel } from "../models/UserModel.js";

const viewUserMiddleware = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.user.userId,
    });

    if (user.role === 2)
      return res.status(200).json({ success: false, message: "Access denied" });

    next();
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal server error" });
  }
};

export { viewUserMiddleware };
