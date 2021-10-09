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
  try {
    const newUser = req.body;
    const user = new UserModel(newUser);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
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
