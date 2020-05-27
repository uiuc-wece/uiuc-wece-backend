var mongoose = require("mongoose");

require('dotenv').config();

const mongo_connection = process.env.MONGODB_URL;

mongoose.connect(mongo_connection, { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database is connected!");
});

module.exports = db;
