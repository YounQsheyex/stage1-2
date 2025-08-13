const USERS = require("../models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Register Users
const registerUser = async (req, res) => {
  const { fullName, email, userName, password, role } = req.body;
  try {
    const userExist = await USERS.findOne({
      $or: [{ email: email || null }, { userName: userName || null }],
    });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new USERS({
      fullName,
      email,
      userName,
      password: hashPassword,
      role,
    });
    if (password < 6) {
      res
        .status(400)
        .json({ message: "Password Must be at Least 6 characters" });
    }
    if (password > 12) {
      res
        .status(400)
        .json({ message: "Password cannot be more than 12 characters" });
    }
    await user.save();
    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      fullName,
      userName,
      email,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// Users Login

const userLogin = async (req, res) => {
  const { userName, password, role } = req.body;
  try {
    const user = await USERS.findOne({ userName });
    if (!user) {
      res
        .status(404)
        .json({ message: `User with username ${userName} not found` });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ message: "Incorrect Username or Password" });
    }
    if (user.role !== role) {
      if (!(user.role === "admin" && role === "user")) {
        return res.status(403).json({ message: "Access Denied for this role" });
      }
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        email: user.email,
        fullName: user.fullName,
        userName: user.userName,
        role: user.role,
        userId: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { registerUser, userLogin };
