import jwt from "jsonwebtoken";
import { TimeSheetModel } from "../models/TimeSheetModel.js";
import { convertJsonToExcel } from "../utils/convertJsonToExcel.js";
import { fDate } from "../utils/formatTime.js";

// checkOutAt = checkInAt
export const checkIn = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  try {
    const newTimeSheet = new TimeSheetModel({
      userId,
      checkInAt: new Date(),
    });

    await newTimeSheet.save();

    res.status(200).json({
      success: true,
      message: "Check in successfully",
      data: newTimeSheet,
    });
  } catch (error) {
    console.log("[ERROR CHECK IN]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

// update CheckOutAt
export const checkOut = async (req, res) => {
  try {
    await TimeSheetModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        checkOutAt: new Date(),
      }
    );
    const newTimeSheet = await TimeSheetModel.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Check out successfully",
      data: newTimeSheet,
    });
  } catch (error) {
    console.log("[ERROR CHECK OUT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getList = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  try {
    const list = await TimeSheetModel.find({ userId });
    res.status(200).json({
      success: true,
      message: "Get list time sheet successfully",
      data: list,
    });
  } catch (error) {
    console.log("[ERROR GET LIST TIME SHEET]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

// time sheet in a month
export const getWorkDate = async (req, res) => {
  const { id } = req.params;
  const { month } = req.body;

  try {
    const timeSheets = await TimeSheetModel.find({ userId: id });

    const newTimeSheets = timeSheets.filter(
      (v) => v.checkInAt.getMonth() === month
    );

    const listWorkDate = newTimeSheets?.map((v) => {
      const { checkInAt, checkOutAt } = v;
      const time = Math.abs(checkOutAt - checkInAt) / 1000 / 60 / 60;
      return {
        day: fDate(checkInAt),
        time: time > 8 ? 8 : Math.trunc(time),
      };
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    convertJsonToExcel(listWorkDate, `listWorkDateOf${monthNames[month]}.xlsx`);

    res.status(200).json({
      success: true,
      message: "Get list work date successfully",
    });
  } catch (error) {
    console.log("[ERROR GET LIST WORK DATE]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
