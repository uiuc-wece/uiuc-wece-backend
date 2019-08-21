// Load required packages
var mongoose = require("mongoose");

// Define our event schema
var EventSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: Date },
  room: { type: String },
  eventKey: { type: String },
  eventPassword: { type: String }
});

// Export the Mongoose model
module.exports = mongoose.model("Event", EventSchema);
