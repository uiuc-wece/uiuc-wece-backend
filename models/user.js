// Load required packages
import mongoose from "mongoose";

// Define our user schema
var UserSchema = new mongoose.Schema({
  providerId: { type: String },
  provider: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }, // user defined, encrypted
  accountType: {
    type: String,
    enum: ["SPONSOR", "MEMBER", "BOARD"],
    required: true,
  },
  major: { type: String },
  studentStatus: { type: String }, // undergrad, graduate, none
  joinDate: { type: Date }, // join date to weceweb portal
  graduationDate: { type: Date },
  totalPoints: { type: Number },
  eventsAttended: [{ type: String }], // list of event keys
  committees: { type: String },
});

// Export the Mongoose model
export default mongoose.model("User", UserSchema);
