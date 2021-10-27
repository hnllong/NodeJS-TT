import jwt from "jsonwebtoken";
import { DepartmentModel } from "../models/DepartmentModel.js";
import { UserModel } from "../models/UserModel.js";

export const getListDepartment = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.status(200).json({
      success: true,
      message: "Get list department successfully",
      data: departments,
    });
  } catch (error) {
    console.log("[ERROR GET LIST DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const createDepartment = async (req, res) => {
  const { name, managerId } = req.body;

  if (!name || !managerId)
    return res.status(200).json({ success: false, message: "Data null" });

  try {
    const departmentName = await DepartmentModel.findOne({ name });
    if (departmentName)
      return res
        .status(200)
        .json({ success: false, message: "Department name already taken" });

    const manager = await UserModel.findOne({ _id: managerId });
    if (manager.role !== 1)
      return res
        .status(200)
        .json({ success: false, message: "This is not a manager" });

    const departmentManagerId = await DepartmentModel.findOne({ managerId });
    if (departmentManagerId)
      return res
        .status(200)
        .json({ success: false, message: "Department Manager already taken" });

    const newDepartment = new DepartmentModel({
      name,
      managerId,
    });
    await newDepartment.save();

    res.status(200).json({
      success: true,
      message: "Department created successfully",
    });
  } catch (error) {
    console.log("[ERROR CREATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const updateDepartment = async (req, res) => {
  const { name, managerId } = req.body;

  try {
    const department = await DepartmentModel.findOne({ name });
    if (department)
      return res
        .status(200)
        .json({ success: false, message: "Department already taken" });

    await DepartmentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        managerId,
      }
    );
    const newDepartment = await DepartmentModel.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Update department successfully",
      data: newDepartment,
    });
  } catch (error) {
    console.log("[ERROR UPDATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await DepartmentModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Delete department successfully",
      data: req.params.id,
    });
  } catch (error) {
    console.log("[ERROR DELETE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const readDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "View department successfully",
      data: department,
    });
  } catch (error) {
    console.log("[ERROR VIEW DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const listUserDepartment = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  try {
    const manager = await UserModel.findOne({ _id: userId });
    const users = await UserModel.find();
    const listUser = users.filter(
      (v) => v.department[0] === manager.department[0]
    );
    res.status(200).json({
      success: true,
      message: "Get list user successfully",
      data: listUser,
    });
  } catch (error) {
    console.log("[ERROR LIST USER DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
