var event = require("../models/event.js");
var mongoose = require("mongoose");

async function getEvent(req, res, next) {
  try {
    let eventKey = req.params.eventKey;
    let k = await event.findOne({ eventKey: eventKey });
    // if event is not found, throw error
    if (k == null) {
      throw Error;
    }
    res.status(200).json({ message: "OK", data: k });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Invalid event key", data: "Event not found" });
  }
}

mongoose.set("useFindAndModify", false);

async function updateEvent(req, res, next) {
  try {
    var updatedEvent = new event({
      title: req.body.title,
      date: req.body.date,
      room: req.body.room,
      eventKey: req.params.eventKey,
      eventPassword: req.body.eventPassword
    });

    var updatedDocument = {
      title: req.body.title,
      date: req.body.date,
      room: req.body.room,
      eventKey: req.params.eventKey,
      eventPassword: req.body.eventPassword
    };

    await event.findOneAndUpdate(
      { eventKey: updatedEvent.eventKey },
      {
        $set: updatedDocument
      }
    );
    res.status(201).json({ message: "Event Updated", data: updatedEvent });
  } catch (err) {
    res.status(404).json({ message: "Event not found" });
  }
}

async function deleteEvent(req, res, next) {
  try {
    let eventKey = req.params.eventKey;
    if ((await event.find({ eventKey: eventKey }).count()) == 0) {
      throw Error;
    }
    await event.findOneAndDelete({ eventKey: eventKey });
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Invalid event key", data: "Event not found" });
  }
}

async function createEvent(req, res, next) {
  try {
    let newEvent = await new event({
      title: req.body.title,
      date: req.body.date,
      room: req.body.room,
      eventKey: req.body.eventKey,
      eventPassword: req.body.eventPassword
    });

    // if event with key already exists, throw error
    if (
      (await event.find({ eventKey: newEvent.eventKey }).countDocuments()) > 0
    ) {
      throw Error("Event key already exists");
    }

    await newEvent.save();
    await res.status(201).json({ message: "Event Created", data: newEvent });
  } catch (err) {
    await res.status(404).json({ message: "Invalid parameters", data: err });
  }
}

module.exports = {
  getEvent: getEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  createEvent: createEvent
};
