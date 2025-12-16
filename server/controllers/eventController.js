const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const event = await Event.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

/* 🔒 ATOMIC RSVP (NO OVERBOOKING) */
exports.rsvpEvent = async (req, res) => {
  const updated = await Event.findOneAndUpdate(
    {
      _id: req.params.id,
      attendees: { $ne: req.user.id },
      $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
    },
    { $addToSet: { attendees: req.user.id } },
    { new: true }
  );

  if (!updated)
    return res.status(400).json({ msg: "Event full or already joined" });

  res.json(updated);
};

exports.leaveEvent = async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, {
    $pull: { attendees: req.user.id }
  });
  res.json({ msg: "Left event" });
};
