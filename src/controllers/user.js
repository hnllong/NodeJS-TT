import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { email, password, fullName, roleId } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });

  try {
    // check for exiting user
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });

    // create new user
    const hashedPassword = await argon2.hash(password);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      fullName,
      roleId,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getListUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
