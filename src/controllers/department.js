import excel from "exceljs";
import jwt from "jsonwebtoken";
import { DepartmentModel } from "../models/DepartmentModel.js";
import { UserModel } from "../models/UserModel.js";
import { convertGender } from "../utils/convertNumber.js";
import { fDate } from "../utils/formatTime.js";

export const getListDepartment = async (req, res) => {
  const { currentPage, pageSize, context } = req.body;

  try {
    const departments = await DepartmentModel.find({
      name: new RegExp(context.toString(), "i"),
    })
      .skip((currentPage - 1) * 5)
      .limit(pageSize);

    const total = await DepartmentModel.count();

    res.status(200).json({
      success: true,
      message: "Get list department successfully",
      data: {
        total: total,
        totalPage: Math.ceil(total / 5),
        list: departments,
      },
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
    const manager = await UserModel.findOne({ _id: managerId });
    if (manager.role !== 1)
      return res
        .status(200)
        .json({ success: false, message: "This is not a manager" });

    const newDepartment = new DepartmentModel({
      name,
      managerId,
    });

    await newDepartment.save();

    await UserModel.findOneAndUpdate(
      { _id: managerId },
      {
        department: [...manager.department, newDepartment._id.toString()],
      }
    );

    res.status(200).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    console.log("[ERROR CREATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const updateDepartment = async (req, res) => {
  const { name, managerId } = req.body;

  try {
    const oldDepartment = await DepartmentModel.findOne({ _id: req.params.id });

    // just edit the name, manager unchanged
    if (oldDepartment.managerId === managerId) {
      await DepartmentModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          managerId,
        }
      );
      const newDepartment = await DepartmentModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json({
        success: true,
        message: "Update department successfully",
        data: newDepartment,
      });
    } else {
      // update old manager
      const oldManager = await UserModel.findOne({
        _id: oldDepartment.managerId,
      });
      const newDepartmentOfOldManager = oldManager.department.filter(
        (v) => v !== req.params.id
      );
      await UserModel.findOneAndUpdate(
        { _id: oldDepartment.managerId },
        {
          department: newDepartmentOfOldManager,
        }
      );

      // update department
      await DepartmentModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          managerId,
        }
      );
      const newDepartment = await DepartmentModel.findOne({
        _id: req.params.id,
      });

      // update new manager
      const newManager = await UserModel.findOne({ _id: managerId });
      await UserModel.findOneAndUpdate(
        { _id: managerId },
        {
          department: [...newManager.department, newDepartment._id.toString()],
        }
      );

      res.status(200).json({
        success: true,
        message: "Update department successfully",
        data: newDepartment,
      });
    }
  } catch (error) {
    console.log("[ERROR UPDATE DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.findOne({ _id: req.params.id });

    // Find the manager of the department you want to delete
    const manager = await UserModel.findOne({ _id: department.managerId });

    // update department of manager
    const newDepartment = manager.department.filter((v) => v !== req.params.id);
    await UserModel.findOneAndUpdate(
      { _id: department.managerId },
      { department: newDepartment }
    );

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

    // filter users who are staff of manager
    const listUser = users.filter((v) => {
      const { department } = v;
      for (let i = 0; i < department?.length; i++) {
        if (manager.department?.includes(department[i])) {
          return true;
        }
      }
    });
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

export const exportStaffList = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  try {
    const manager = await UserModel.findOne({ _id: userId });
    const users = await UserModel.find();

    // filter users who are staff of manager
    const listUser = users.filter((v) => {
      const { department } = v;
      for (let i = 0; i < department?.length; i++) {
        if (manager.department?.includes(department[i])) {
          return true;
        }
      }
    });

    const listStaff = listUser.filter(
      (v) => v._id.toString() !== userId.toString()
    );

    const newListStaff = listStaff?.map((v) => {
      const { email, fullName, address, gender, dateOfBirth, phone } = v;
      return {
        email: email,
        name: fullName,
        address: address,
        gender: convertGender(gender),
        dateOfBirth: fDate(dateOfBirth),
        phone: phone,
      };
    });

    // Create a new workbook
    const workbook = new excel.Workbook();
    // New Worksheet
    const worksheet = workbook.addWorksheet("List staffs");

    // Path to download excel
    // const path = "/home/hieulv/Downloads";
    const path = "/home/devops";

    //  WorkSheet Header
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Name", key: "name", width: 30 },
      { header: "Address", key: "address", width: 50 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "DateOfBirth", key: "dateOfBirth", width: 30 },
      { header: "Phone", key: "phone", width: 30 },
    ];

    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    // Add Array Rows
    worksheet.addRows(newListStaff);

    await workbook.xlsx.writeFile(`${path}/staffs-${manager?.email}.xlsx`);

    res.status(200).json({
      success: true,
      message: "Export staff list successfully",
      data: `${path}/staffsOf${manager?.name}.xlsx`,
    });
  } catch (error) {
    console.log("[ERROR EXPORT STAFF LIST DEPARTMENT]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
