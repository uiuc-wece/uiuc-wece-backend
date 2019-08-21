// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  netId: { type: String, required: true },
  email: { type: String },
  major: { type: String },
  graduationDate: { type: Date }
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
