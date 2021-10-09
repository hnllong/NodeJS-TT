import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
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
      type: String,
    },
    address: {
      type: String,
    },
    roleId: {
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

export const UserModel = mongoose.model("User", schema);
