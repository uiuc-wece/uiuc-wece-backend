var User = require("../models/user.js");
var mongoose = require("mongoose");

async function getUser(req, res, next) {
  try {
    let username = req.params.username;
    let k = await User.findOne({ username: username });
    // if user not found, throw error
    if (k == null) {
      throw Error;
    }
    res.status(200).json({ message: "OK", data: k });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Invalid Username", data: "User not found" });
  }
}

mongoose.set("useFindAndModify", false);

async function updateUser(req, res, next) {
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

    await User.findOneAndUpdate(
      { username: updatedUser.username },
      {
        $set: updatedDocument,
      }
    );
    res.status(201).json({ message: "User Updated", data: updatedUser });
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
}

async function deleteUser(req, res, next) {
  try {
    let username = req.params.username;
    if ((await User.find({ username: username }).count()) == 0) {
      throw Error;
    }
    await User.findOneAndDelete({ username: username });
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Invalid Username", data: "User not found" });
  }
}

async function createUser(req, res, next) {
  try {
    let newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      accountType: req.body.accountType,
      email: req.body.email,
      major: req.body.major,
      studentStatus: req.body.studentStatus,
      joinDate: new Date(),
      graduationDate: req.body.graduationDate,
      totalPoints: 0,
      eventsAttended: [],
      committees: req.body.committees,
    });

    // if user with username already exists, throw error
    if (
      (await User.find({ username: newUser.username }).countDocuments()) > 0
    ) {
      throw Error("This username has already been taken");
    }

    await newUser.save();
    await res.status(201).json({ message: "User Created", data: newUser });
  } catch (err) {
    await res.status(404).json({ message: "Invalid parameters", data: err });
  }
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  createUser: createUser,
};
