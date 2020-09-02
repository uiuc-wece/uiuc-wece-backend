// Get the packages we need
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import passport from "passport";

import router from "./routes/index.js";
import { initializeAuthentication } from "./auth/index.js";
import "./db.js";

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
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
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api", router);

initializeAuthentication(app);

// Start the server
app.listen(port);
console.log("Server running on port " + port);
