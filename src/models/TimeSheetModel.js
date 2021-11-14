import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    checkInAt: {
      type: Date,
    },
    checkOutAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const TimeSheetModel = mongoose.model("timesheets", schema);
