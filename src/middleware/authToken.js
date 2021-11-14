import jwt from "jsonwebtoken";
import { environment } from "../config/index.js";

const authToken = (req, res, next) => {
  try {
    const access_token = req.headers["access_token"];
    if (!access_token)
      return res
        .status(200)
        .json({ success: false, message: "Invalid AccessToken" });

    jwt.verify(access_token, environment.config.jwt_secret, (err, data) => {
      if (err)
        return res
          .status(200)
          .json({ success: false, message: "Invalid Authentication" });

      req.user = data;

      next();
    });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "Internal server error" });
  }
};

export { authToken };
