import { DepartmentModel } from "../models/DepartmentModel.js";

export const getListDepartment = async (req, res) => {
  try {
    const departments = await DepartmentModel.find();
    res.json({
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
  const { name } = req.body;

  if (!name)
    return res.status(200).json({ success: false, message: "Name null" });

  try {
    const department = await DepartmentModel.findOne({ name });
    if (department)
      return res
        .status(200)
        .json({ success: false, message: "Department already taken" });

    const newDepartment = new DepartmentModel({
      name,
    });
    await newDepartment.save();

    res.json({
      success: true,
      message: "Department created successfully",
    });
  } catch (error) {
    console.log("[ERROR CREATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const updateDepartment = async (req, res) => {
  const { name } = req.body;

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
      }
    );
    res.json({
      success: true,
      message: "Update department successfully",
    });
  } catch (error) {
    console.log("[ERROR UPDATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  const { arrayId } = req.body;
  try {
    for (let i = 0; i < arrayId.length; i++) {
      await DepartmentModel.findByIdAndDelete({ _id: arrayId[i] });
    }
    res.json({
      success: true,
      message: "Delete department successfully",
      data: arrayId,
    });
  } catch (error) {
    console.log("[ERROR DELETE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const readDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.findOne({ _id: req.params.id });
    res.json({
      success: true,
      message: "View department successfully",
      data: department,
    });
  } catch (error) {
    console.log("[ERROR VIEW DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
