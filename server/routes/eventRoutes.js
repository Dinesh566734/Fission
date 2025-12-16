const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createEvent,
  getEvents,
  rsvpEvent,
  leaveEvent
} = require("../controllers/eventController");

router.get("/", getEvents);
router.post("/", auth, createEvent);
router.post("/:id/rsvp", auth, rsvpEvent);
router.post("/:id/leave", auth, leaveEvent);

module.exports = router;
