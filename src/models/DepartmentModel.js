import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    managerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const DepartmentModel = mongoose.model("departments", schema);
