import Event from "../models/event.js";
import mongoose from "mongoose";

async function getEvent(req, res, next) {
  try {
    let eventKey = req.params.eventKey;
    let k = await Event.findOne({ eventKey: eventKey });
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
    var updatedEvent = new Event({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      points: req.body.points,
      eventKey: req.params.eventKey,
      eventPassword: req.body.eventPassword,
      zoomLink: req.body.zoomLink,
    });

    var updatedDocument = {
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      points: req.body.points,
      eventKey: req.params.eventKey,
      eventPassword: req.body.eventPassword,
      zoomLink: req.body.zoomLink,
    };

    await Event.findOneAndUpdate(
      { eventKey: updatedEvent.eventKey },
      {
        $set: updatedDocument,
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
    if ((await Event.find({ eventKey: eventKey }).count()) == 0) {
      throw Error;
    }
    await Event.findOneAndDelete({ eventKey: eventKey });
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Invalid event key", data: "Event not found" });
  }
}

async function createEvent(req, res, next) {
  try {
    let newEvent = await new Event({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      points: req.body.points,
      eventKey: req.body.eventKey,
      eventPassword: req.body.eventPassword,
      zoomLink: req.body.zoomLink,
    });

    // if event with key already exists, throw error
    if (
      (await Event.find({ eventKey: newEvent.eventKey }).countDocuments()) > 0
    ) {
      throw Error("Event key already exists");
    }

    await newEvent.save();
    await res.status(201).json({ message: "Event Created", data: newEvent });
  } catch (err) {
    await res.status(404).json({ message: "Invalid parameters", data: err });
  }
}

export { getEvent, updateEvent, deleteEvent, createEvent };
