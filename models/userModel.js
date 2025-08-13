const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerUser = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter Your Full Name"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      unique: true,
      lowercase: true,
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "Username is Required"],
    },
    role: {
      type: String,
      required: [true, "role is Required"],
      enum: ["admin", "user"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Minimum Length Should at least 6"],
    },
  },
  { timestamps: true }
);

const USERS = mongoose.model("users", registerUser);
module.exports = USERS;
