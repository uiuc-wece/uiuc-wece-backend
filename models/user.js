// Load required packages
var mongoose = require("mongoose");

const Event = require("./event");

// Define our user schema
var UserSchema = new mongoose.Schema({
  oAuthId: { type: Number, required: true },
  oAuthData: { type: Object, required: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true }, // user defined, encrypted
  accountType: {
    type: String,
    enum: ["SPONSOR", "MEMBER", "BOARD"],
    required: true,
  },
  email: { type: String },
  major: { type: String },
  studentStatus: { type: String }, // undergrad, graduate, none
  joinDate: { type: Date }, // join date to weceweb portal
  graduationDate: { type: Date },
  totalPoints: { type: Number },
  eventsAttended: [{ type: Event }],
  committees: { type: String },
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
