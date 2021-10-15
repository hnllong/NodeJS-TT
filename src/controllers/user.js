import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { generateRandomString } from "../utils/generateRandomString.js";
import { sendMailCreateUser, validateEmail } from "../utils/handleEmail.js";

export const createUser = async (req, res) => {
  const { email, password, fullName, roleId } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });
  }

  if (!validateEmail(email)) {
    return res.status(200).json({ success: false, message: "Invalid email" });
  }

  if (password.length < 6) {
    return res.status(200).json({
      success: false,
      message: "Invalid emailPassword must be at least 6 characters",
    });
  }

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
      active: false,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
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
  if (!email) {
    return res.send("Email authentication error");
  }
  try {
    await UserModel.findOneAndUpdate({ email: email }, { active: true });
    res.send(
      `Verified account. Go to <a href="http://localhost:3000">LOGIN</a>`
    );
  } catch (error) {
    res.send("Authentication error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, message: "Missing email and/or password" });
  }

  if (!validateEmail(email)) {
    return res.status(200).json({ success: false, message: "Invalid email" });
  }

  if (password.length < 6) {
    return res.status(200).json({
      success: false,
      message: "Invalid emailPassword must be at least 6 characters",
    });
  }

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

    if (!user.active) {
      return res.status(200).json({
        success: false,
        message: "Your account is not verified",
      });
    }

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
        { password: arrayNewHashedPassword[i], active: false }
      );

      sendMailCreateUser("Reset password", user.email, arrayNewPassword[i])
        .then((result) => {
          console.log("Email sent...", result);
        })
        .catch((error) => {
          console.log("[ ERROR FUNCTION SEND MAIL ]", error.message);
        });
    }
    res.json({
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
