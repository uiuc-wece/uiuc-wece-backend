var mongoose = require("mongoose");
var secrets = require("./config/secrets");

mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database is connected!");
});

module.exports = db;
