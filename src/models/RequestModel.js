import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
    endAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    approver: {
      type: Array,
      required: true,
    },
    status: {
      // 0: waiting
      // 1: accepted
      // 2: refused
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const RequestModel = mongoose.model("requests", schema);
