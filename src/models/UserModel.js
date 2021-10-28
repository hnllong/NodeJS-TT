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
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: new Date(),
    },
    gender: {
      // 0: nam, 1: nu, 2: hide gender
      type: Number,
      default: 2,
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      // 0: root, 1:manager, 2: staff
      type: Number,
      required: true,
    },
    department: {
      type: Array,
      default: [],
    },
    active: {
      // 0: inactive - can't login
      // 1: be activated - can login
      // 2: logged in for the first time
      type: Number,
    },
    joinCompanyAt: {
      type: Date,
      default: new Date(),
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", schema);
