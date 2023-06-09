import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { environment } from "../config/index.js";
import { UserModel } from "../models/UserModel.js";
import { generateRandomString } from "../utils/generateRandomString.js";
import { sendMailCreateUser, validateEmail } from "../utils/handleEmail.js";
import { DepartmentModel } from "../models/DepartmentModel.js";

export const createUser = async (req, res) => {
  const { email, password, fullName, role, gender } = req.body;

  if (!email || !password)
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });

  if (!validateEmail(email))
    return res.status(200).json({ success: false, message: "Invalid email" });

  if (password.length < 6)
    return res.status(200).json({
      success: false,
      message: "Invalid emailPassword must be at least 6 characters",
    });

  try {
    // check for exiting user
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(200)
        .json({ success: false, message: "Email already taken" });

    // create new user
    const hashedPassword = await argon2.hash(password);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      fullName,
      role,
      gender,
      active: 0,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });

    sendMailCreateUser("Create account", newUser.email, password)
      .then((result) => {
        console.log("Email sent...", result);
      })
      .catch((error) => {
        console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
      });
  } catch (error) {
    console.log("[ERROR CREATE USER]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const authentication = async (req, res) => {
  const email = req.query.email;
  if (!email) return res.send("Email authentication error");

  try {
    await UserModel.findOneAndUpdate({ email: email }, { active: 1 });
    res.send(
      `Verified account. Go to <a href="http://training.prod">LOGIN</a>`
    );
  } catch (error) {
    res.send("Authentication error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });

  if (!validateEmail(email))
    return res.status(200).json({ success: false, message: "Invalid email" });

  if (password.length < 6)
    return res.status(200).json({
      success: false,
      message: "Invalid emailPassword must be at least 6 characters",
    });

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "Incorrect email or password" });

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(200)
        .json({ success: false, message: "Incorrect email or password" });

    if (user.active === 0)
      return res.status(200).json({
        success: false,
        message: "Your account is not verified",
      });

    const accessToken = jwt.sign(
      { userId: user._id },
      environment.config.jwt_secret,
      { expiresIn: "10000000000000" }
    );

    if (user.active === 1)
      // res.redirect("/change-password");
      return res.status(200).json({
        success: true,
        message: "User logged in successfully.Please change password",
        data: false,
        accessToken,
      });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log("[ERROR LOGIN]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { arrayId } = req.body;

  const arrayNewPassword = arrayId.map((v) => {
    return generateRandomString(6);
  });

  try {
    let arrayNewHashedPassword = [];
    for (let i = 0; i < arrayNewPassword.length; i++) {
      const newHashedPassword = await argon2.hash(arrayNewPassword[i]);
      arrayNewHashedPassword.push(newHashedPassword);
    }

    for (let i = 0; i < arrayId.length; i++) {
      const user = await UserModel.findByIdAndUpdate(
        { _id: arrayId[i] },
        { password: arrayNewHashedPassword[i], active: 1 }
      );

      sendMailCreateUser("Reset password", user.email, arrayNewPassword[i])
        .then((result) => {
          console.log("Email sent...", result);
        })
        .catch((error) => {
          console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
        });
    }
    res.status(200).json({
      success: true,
      message: "Reset password successfully",
    });
  } catch (error) {
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getInfo = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  try {
    const user = await UserModel.findOne({ _id: userId });
    res.status(200).json({
      success: true,
      message: "Got user information successfully",
      data: user,
    });
  } catch (error) {
    console.log("[ERROR GET USER INFO]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getList = async (req, res) => {
  const { currentPage, pageSize, context } = req.body;

  try {
    const users = await UserModel.find({
      fullName: new RegExp(context.toString(), "i"),
    })
      .skip((currentPage - 1) * 5)
      .limit(pageSize);

    const newUsers = users.filter((v) => v._id.toString() !== req.user.userId);

    const total = await UserModel.count();

    res.status(200).json({
      success: true,
      message: "Get list user successfully",
      data: {
        total: total,
        totalPage: Math.ceil(total / 5),
        list: newUsers,
      },
    });
  } catch (error) {
    console.log("[ERROR GET LIST USER]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res
      .status(200)
      .json({ success: false, message: "Missing password" });

  try {
    const user = await UserModel.findOne({ _id: userId });

    const passwordValid = await argon2.verify(user.password, oldPassword);

    if (!passwordValid)
      return res
        .status(200)
        .json({ success: false, message: "Incorrect password" });

    if (oldPassword === newPassword)
      return res.status(200).json({ success: false, message: "Same password" });

    const newHashedPassword = await argon2.hash(newPassword);
    if (user.active === 1) {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: newHashedPassword, active: 2 }
      );
    } else {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: newHashedPassword }
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Change password successfully" });
  } catch (error) {
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { arrayId } = req.body;
  try {
    for (let i = 0; i < arrayId.length; i++) {
      const department = await DepartmentModel.findOne({
        managerId: arrayId[i],
      });
      if (department) {
        return res.status(200).json({
          success: false,
          message: "Can't be deleted, there is one or more relationship here",
        });
      }
      await UserModel.findByIdAndDelete({ _id: arrayId[i] });
    }
    res.status(200).json({
      success: true,
      message: "Delete user successfully",
      data: arrayId,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  const {
    fullName,
    dateOfBirth,
    gender,
    address,
    role,
    department,
    joinCompanyAt,
    phone,
    avatar,
  } = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId });

    // my update
    if (userId === req.params.id) {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          fullName,
          dateOfBirth,
          gender,
          address,
          role,
          joinCompanyAt,
          phone,
          avatar,
        }
      );

      const newUser = await UserModel.findOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "Update user successfully",
        data: newUser,
      });
    }

    // root update
    if (user.role === 0) {
      const oldUser = await UserModel.findOne({ _id: req.params.id });

      // check update role for manager
      // ex: role: 2 -> role: 1 true when department of manager: []
      if (
        oldUser.role === 1 &&
        oldUser.department.length > 0 &&
        oldUser.role !== role
      ) {
        return res.status(200).json({
          success: false,
          message: "Please update the department before updating this manger",
        });
      }

      // if manager don't update department of manager
      if (oldUser.role === 1) {
        await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            fullName,
            dateOfBirth,
            gender,
            address,
            role,
            joinCompanyAt,
            phone,
          }
        );
      }

      // update staff -> manager => department: []
      if (oldUser.role === 2 && oldUser.role != role) {
        await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            fullName,
            dateOfBirth,
            gender,
            address,
            role,
            department: [],
            joinCompanyAt,
            phone,
          }
        );
      }

      // if staff can update department of staff
      if (oldUser.role === 2 && oldUser.role == role) {
        await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            fullName,
            dateOfBirth,
            gender,
            address,
            role,
            department,
            joinCompanyAt,
            phone,
          }
        );
      }

      const newUser = await UserModel.findOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: "Update user successfully",
        data: newUser,
      });
    }
    res.status(200).json({
      success: false,
      message: "No permission to edit",
    });
  } catch (error) {
    console.log("[ERROR UPDATE USER]]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const viewUser = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  try {
    const userLogin = await UserModel.findOne({ _id: userId });
    const user = await UserModel.findOne({ _id: req.params.id });

    if (userLogin.role === 0)
      return res.status(200).json({
        success: true,
        message: "View user successfully",
        data: user,
      });

    const { department } = user;
    let checked = false;
    for (let i = 0; i < department?.length; i++) {
      if (userLogin.department?.includes(department[i])) {
        checked = true;
      }
    }

    if (userLogin.role === 1 && checked) {
      return res.status(200).json({
        success: true,
        message: "View user successfully",
        data: user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No permission to view",
      });
    }
  } catch (error) {
    console.log("[ERROR VIEW USER]]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
