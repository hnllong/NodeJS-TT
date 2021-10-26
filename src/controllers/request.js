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

    res.status(200).json({
      success: true,
      message: "Request created successfully",
    });

    sendMailCreateRequest(
      newRequest?._id,
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

export const acceptRequest = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.send("Request error");
  try {
    await RequestModel.findOneAndUpdate(
      { _id: id },
      {
        status: 1,
      }
    );
    res.send("Action has been saved");
  } catch (error) {
    res.send("Internal server error");
  }
};

export const refuseRequest = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.send("Request error");
  try {
    await RequestModel.findOneAndUpdate(
      { _id: id },
      {
        status: 2,
      }
    );
    res.send("Action has been saved");
  } catch (error) {
    res.send("Internal server error");
  }
};

export const getList = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (user.role === 0) {
      const requests = await RequestModel.find();
      return res.status(200).json({
        success: true,
        message: "Get all request successfully",
        data: requests,
      });
    }
    if (user.role === 1) {
      return res.status(200).json({
        success: true,
        message: "Get list request of department successfully",
        data: [],
      });
    }
    if (user.role === 2) {
      const requests = await RequestModel.find({ userId });
      return res.status(200).json({
        success: true,
        message: "Get list request of user successfully",
        data: requests,
      });
    }
  } catch (error) {
    console.log("[ERROR GET LIST REQUEST OF USER]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
