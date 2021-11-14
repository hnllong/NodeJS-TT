import { google } from "googleapis";
import nodemailer from "nodemailer";

// import { environment } from "../config/index.js";
// const CLIENT_ID = environment.google_cloud.client_id;
// const CLIENT_SECRET = environment.google_cloud.client_secret;
// const REDIRECT_ID = environment.google_cloud.redirect_id;
// const REFRESH_TOKEN = environment.google_cloud.refresh_token;

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

export const sendMailCreateUser = async (type, email, password) => {
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
      text: `${type} with [ Email: ${email}, password: ${password}].
            Please verify your mail to continue...
            Verify Your Email`,
      html: `<h2> ${type} with [ Email: ${email}, password: ${password}]<h2/>
            <h4> Please verify your mail to continue...</h4>
            <a href="http://localhost:5000/api/v1/user/authentication?email=${email}">Verify Your Email</a>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("[ ERROR SEND MAIL ]", error);
  }
};

export const sendMailCreateRequest = async (
  type,
  reason,
  startAt,
  endAt,
  emailRequest,
  emailApprover
) => {
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
      from: emailRequest,
      to: !!emailApprover
        ? [...emailApprover, "hieu.lv@zinza.com.vn"]
        : ["hieu.lv@zinza.com.vn"],
      subject: type,
      text: `${type}`,
      html: `<h2>${type} of ${emailRequest}<h2/>
            <h3>From: ${startAt} To: ${endAt}</h3>
            <h4>${reason}</h4>
            <a href="http://localhost:3000/x-approval">Go to Web</a>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("[ ERROR SEND MAIL ]", error);
  }
};

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (emailTest) => {
  return emailRegExp.test(emailTest);
};
