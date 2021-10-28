import jwt from "jsonwebtoken";
import { TimeSheetModel } from "../models/TimeSheetModel.js";

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
