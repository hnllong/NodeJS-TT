import dotenv from "dotenv";

dotenv.config();

export const development = {
  mongo_db: {
    user: "hieulv",
    password: "zTYI1UAjVOGxMvic",
  },
  google_cloud: {
    client_id:
      "983769415320-l72k6rdrvbmqmcs07fi49hjac7fqpmkr.apps.googleusercontent.com",
    client_secret: "XQyVjxNSuThFcm63xRp5lB0jyLrN",
    redirect_id: "https://developers.google.com/oauthplayground",
    refresh_token:
      "1//04ydvBFpzt_D5CgYIARAAGAQSNwF-L9IrmB59aL0HaBAjy-tD-qMLPZaqhYQ2kVVX1nFmHnyiKMUsS17C01ZuwbVcc6zlAJuJsJQ",
  },
  config: {
    port: 5000,
    jwt_secret: "test",
  },
};

export const production = {};
