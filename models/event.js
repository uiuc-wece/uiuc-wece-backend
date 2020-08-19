// Load required packages
var mongoose = require("mongoose");

// Define our event schema
var EventSchema = new mongoose.Schema({
  title: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  points: { type: Number },
  eventKey: { type: String },
  eventPassword: { type: String },
  facebookEvent: { type: String }, // url to fb event
  zoomLink: { type: String },
});

// Export the Mongoose model
module.exports = mongoose.model("Event", EventSchema);
