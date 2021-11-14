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
    if (user.role === 2) {
      const listDepartment = await DepartmentModel.find();
      const listManager = await UserModel.find({ role: 1 });

      // get list department the user join
      const userDepartments = listDepartment.filter((v) =>
        user.department?.includes(v._id)
      );

      // map -> array managerId
      const arrManagerId = userDepartments?.map((v) => {
        return v.managerId;
      });

      // find array manager
      const departmentManagers = listManager.filter((v) =>
        arrManagerId?.includes(v._id.toString())
      );

      // map array mail manager to send email
      const arrayManagerEmail = departmentManagers?.map((v) => {
        return v.email;
      });

      const newRequest = new RequestModel({
        type,
        reason,
        startAt,
        endAt,
        userId,
        approver: [...arrManagerId, rootId],
        status: 0,
      });

      await newRequest.save();

      res.status(200).json({
        success: true,
        message: "Request created successfully",
        data: newRequest,
      });

      sendMailCreateRequest(
        type,
        reason,
        startAt,
        endAt,
        user?.email,
        arrayManagerEmail
      )
        .then((result) => {
          console.log("Email sent...", result);
        })
        .catch((error) => {
          console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
        });
    }
    if (user.role === 1) {
      const newRequest = new RequestModel({
        type,
        reason,
        startAt,
        endAt,
        userId,
        approver: [rootId],
        status: 0,
      });

      await newRequest.save();

      res.status(200).json({
        success: true,
        message: "Request created successfully",
        data: newRequest,
      });

      sendMailCreateRequest(type, reason, startAt, endAt, user?.email)
        .then((result) => {
          console.log("Email sent...", result);
        })
        .catch((error) => {
          console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
        });
    }
  } catch (error) {
    console.log("[ERROR CREATE REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    await RequestModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: 1,
      }
    );

    const request = await RequestModel.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Accept request successfully",
      data: request,
    });
  } catch (error) {
    console.log("[ERROR ACCEPT REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const refuseRequest = async (req, res) => {
  try {
    await RequestModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: 2,
      }
    );

    const request = await RequestModel.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Refuse request successfully",
      data: request,
    });
  } catch (error) {
    console.log("[ERROR REFUSE REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getUserList = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  try {
    const requests = await RequestModel.find({ userId });
    res.status(200).json({
      success: true,
      message: "Get list request of user successfully",
      data: requests,
    });
  } catch (error) {
    console.log("[ERROR GET USER LIST REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getMemberList = async (req, res) => {
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
      const allRequests = await RequestModel.find();

      const allRequestsOfManager = allRequests.filter((v) => {
        const { approver } = v;
        for (let i = 0; i < approver?.length; i++) {
          if (user._id.toString() === approver[i].toString()) {
            return true;
          }
        }
      });

      return res.status(200).json({
        success: true,
        message: "Get list request of department successfully",
        data: allRequestsOfManager,
      });
    }
  } catch (error) {
    console.log("[ERROR GET MEMBER LIST REQUEST]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
