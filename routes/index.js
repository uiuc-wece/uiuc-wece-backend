import express from "express";
const router = express.Router();

import { getUser, createUser, updateUser, deleteUser } from "./user.js";
import { getEvent, createEvent, updateEvent, deleteEvent } from "./event.js";
import { addSubscriber, unsubscribe } from "./mailerlite.js";

router.get("/user/:netId", getUser);
router.post("/user", createUser);
router.put("/user/:netId", updateUser);
router.delete("/user/:netId", deleteUser);

router.get("/event/:eventKey", getEvent);
router.post("/event", createEvent);
router.put("/event/:eventKey", updateEvent);
router.delete("/event/:eventKey", deleteEvent);

router.post("/subscriber", addSubscriber);
router.put("/subscriber", unsubscribe);

export default router;