import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function authToken(req, res, next) {
  const token = req.headers["access_token"];

  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    next();
  });
}

export { authToken };
