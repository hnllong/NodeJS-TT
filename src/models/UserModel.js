import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Number,
    },
    gender: {
      // 0: nam, 1: nu, 2: hide gender
      type: Number,
    },
    address: {
      type: String,
    },
    roleId: {
      // 0: root, 1:manager, 2: staff
      type: Number,
      required: true,
    },
    department: {
      type: Array,
    },
    joinCompanyAt: {
      type: Number,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", schema);
