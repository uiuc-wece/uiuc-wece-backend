import User from "../models/user.js";
import mongoose from "mongoose";
import { verifyPassword, hashPassword } from "../auth/utils.js";
import { login } from "../auth/strategies/jwt.js";

async function getUserById(id) {
  return await User.findById(id).exec();
}

async function getUser(req, res) {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email }).exec();
    // if user not found, throw error
    if (user == null) {
      throw Error("Invalid Email");
    }
    // verify password
    if (!(await verifyPassword(password, user.password))) {
      throw Error("Incorrect Password");
    }

    await login(req, user)
      .then((token) => {
        res
          .status(201)
          .cookie("jwt", token, { httpOnly: true })
          .json({ success: true, message: "Logged in", data: "/" });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Login error",
          data: err,
        });
      });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: err, data: "Could not log in user." });
  }
}

mongoose.set("useFindAndModify", false);

async function updateUser(req, res) {
  try {
    var updatedDocument = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.params.username,
      password: req.body.password,
      accountType: req.body.accountType,
      email: req.body.email,
      major: req.body.major,
      studentStatus: req.body.studentStatus,
      joinDate: req.body.joinDate,
      graduationDate: req.body.graduationDate,
      totalPoints: req.body.totalPoints,
      eventsAttended: req.body.eventsAttended,
      committees: req.body.committees,
    };

    var updatedUser = new User(updatedDocument);

    await findOneAndUpdate(
      { username: updatedUser.username },
      {
        $set: updatedDocument,
      }
    );
    res
      .status(201)
      .json({ success: true, message: "User Updated", data: updatedUser });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not found" });
  }
}

async function deleteUser(req, res) {
  try {
    let username = req.params.username;
    if ((await find({ username: username }).count()) == 0) {
      throw Error;
    }
    await findOneAndDelete({ username: username });
    res.status(200).json({ success: true, message: "OK" });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Invalid Username",
      data: "User not found",
    });
  }
}

async function createUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    accountType,
    major,
    studentStatus,
    graduationDate,
    committees,
  } = req.body;

  try {
    let newUser = new User({
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      accountType,
      major,
      studentStatus,
      joinDate: new Date(),
      graduationDate,
      totalPoints: 0,
      eventsAttended: [],
      committees,
    });

    // if user with email already exists, throw error
    if ((await User.find({ email: newUser.email }).countDocuments()) > 0) {
      throw Error("This email has already been taken");
    }

    await newUser.save();

    await login(req, user)
      .then((token) => {
        res
          .status(201)
          .cookie("jwt", token, { httpOnly: true })
          .json({ success: true, message: "User Created", data: "" });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Authentication error",
          data: err,
        });
      });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "Invalid parameters", data: err });
  }
}

export { getUserById, getUser, updateUser, deleteUser, createUser };
