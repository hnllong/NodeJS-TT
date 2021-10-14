import { google } from "googleapis";
import nodemailer from "nodemailer";

const CLIENT_ID =
  "983769415320-l72k6rdrvbmqmcs07fi49hjac7fqpmkr.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_ID = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04ydvBFpzt_D5CgYIARAAGAQSNwF-L9IrmB59aL0HaBAjy-tD-qMLPZaqhYQ2kVVX1nFmHnyiKMUsS17C01ZuwbVcc6zlAJuJsJQ";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_ID
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (type, email, password) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "hieu.lv@zinza.com.vn",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "hieu.lv@zinza.com.vn",
      to: email,
      subject: type,
      text: `Hello ${email}. You have been created an account with [ Email: ${email}, password: ${password}]. Please authenticate to be able to log in`,
      html: `<div><h1>Hello ${email}.</h1> <h2>You have been created an account with [ Email: ${email}, password: ${password}].<h2/> <h2>Please authenticate to be able to log in<h2/> </div>`,
    };
    console.log("mail options: ", mailOptions);

    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (error) {
    console.log("[ ERROR SEND MAIL ]", error);
  }
};
