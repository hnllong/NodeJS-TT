import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

export const createUser = async (req, res) => {
  const { email, password, fullName, roleId } = req.body;
  if (!email || !password)
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });

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
      roleId,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("[ERROR CREATE USER]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });

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
        .json({ success: false, message: "Incorrect password or password" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log("[ERROR LOGIN]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};

export const getInfo = async (req, res) => {
  const { access_token } = req.headers;
  const { userId } = jwt.decode(access_token);

  try {
    const user = await UserModel.findOne({ _id: userId });
    res.json({
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
  try {
    const users = await UserModel.find();
    res.json({
      success: true,
      message: "Get list user successfully",
      data: users,
    });
  } catch (error) {
    console.log("[ERROR GET LIST USER]", error);
    res.status(200).json({ success: false, message: "Internal server error" });
  }
};
