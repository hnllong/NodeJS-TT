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
      default: Date.now(),
    },
    gender: {
      // 0: nam, 1: nu, 2: hide gender
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      // 0: root, 1:manager, 2: staff
      type: Number,
      required: true,
    },
    department: {
      type: Array,
    },
    active: {
      // 0: inactive - can't login
      // 1: be activated - can login
      // 2: logged in for the first time
      type: Number,
    },
    joinCompanyAt: {
      type: Number,
      default: Date.now(),
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", schema);
