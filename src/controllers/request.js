import jwt from "jsonwebtoken";
import { DepartmentModel } from "../models/DepartmentModel.js";
import { RequestModel } from "../models/RequestModel.js";
import { UserModel } from "../models/UserModel.js";
import { sendMailCreateRequest } from "../utils/handleEmail.js";

export const createRequest = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  const { type, reason, startAt, endAt } = req.body;
  const rootId = "61757053bf419ca00d701b64";

  try {
    const user = await UserModel.findOne({ _id: userId });

    const department = await DepartmentModel.findOne({
      _id: user.department[0],
    });

    const { managerId } = department;
    const manager = await UserModel.findOne({ _id: managerId });

    const newRequest = new RequestModel({
      type,
      reason,
      startAt,
      endAt,
      userId,
      approver: [managerId, rootId],
      status: 0,
    });

    await newRequest.save();

    res.json({
      success: true,
      message: "Request created successfully",
    });

    sendMailCreateRequest(
      type,
      reason,
      startAt,
      endAt,
      user?.email,
      manager?.email
    )
      .then((result) => {
        console.log("Email sent...", result);
      })
      .catch((error) => {
        console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
      });
  } catch (error) {
    console.log("[ERROR CREATE REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
