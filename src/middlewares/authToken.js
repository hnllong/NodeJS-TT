import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authToken = (req, res, next) => {
  try {
    const access_token = req.headers["access_token"];
    if (!access_token)
      return res
        .status(401)
        .json({ success: false, message: "Invalid AccessToken" });

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Invalid Authentication" });

      req.user = data;

      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { authToken };
