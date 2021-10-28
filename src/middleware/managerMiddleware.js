import { UserModel } from "../models/UserModel.js";

const managerMiddleware = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.user.userId,
    });

    if (user.role !== 1)
      return res
        .status(200)
        .json({ success: false, message: "Manager access denied" });

    next();
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal server error" });
  }
};

export { managerMiddleware };
