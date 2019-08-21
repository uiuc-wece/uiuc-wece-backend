var user = require("../models/user.js");

async function getUser(req, res, next) {
  try {
    let netId = req.params.netId;
    let k = await user.findOne({ netId: netId });
    // if user not found, throw error
    if (k == null) {
      throw Error;
    }
    res.status(200).json({ message: "OK", data: k });
  } catch (err) {
    res.status(404).json({ message: "Invalid NetID", data: "User not found" });
  }
}

async function updateUser(req, res, next) {
  try {
    var updatedUser = new user({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      netId: req.params.netId,
      email: req.params.email,
      major: req.params.major,
      graduationDate: req.params.graduationDate
    });

    await user.findOneAndUpdate(
      { netId: updatedUser.netId },
      {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        major: updatedUser.major,
        graduationDate: updatedUser.graduationDate
      }
    );
    res.status(201).json({ message: "User Updated", data: updatedUser });
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
}

async function deleteUser(req, res, next) {
  try {
    let netId = req.params.netId;
    if ((await user.find({ netId: netId }).count()) == 0) {
      throw Error;
    }
    await user.findOneAndDelete({ netId: netId });
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(404).json({ message: "Invalid NetID", data: "User not found" });
  }
}

async function createUser(req, res, next) {
  try {
    let newUser = await new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      netId: req.body.netId,
      email: req.body.email,
      major: req.body.major,
      graduationDate: req.body.graduationDate
    });

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
  createUser: createUser
};
