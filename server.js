// Get the packages we need
var bodyParser = require("body-parser"),
  express = require("express");

var router = require("./routes/index.js");
require("./db");

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/api", router);

// Start the server
app.listen(port);
console.log("Server running on port " + port);
