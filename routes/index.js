var express = require("express");
var router = express.Router();

var user = require("./user");
var event = require("./event");

router.get("/user/:netId", user.getUser);
router.post("/user", user.createUser);
router.put("/user/:netId", user.updateUser);
router.delete("/user/:netId", user.deleteUser);

router.get("/event/:eventKey", event.getEvent);
router.post("/event", event.createEvent);
router.put("/event/:eventKey", event.updateEvent);
router.delete("/event/:eventKey", event.deleteEvent);

module.exports = router;
