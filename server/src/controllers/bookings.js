const Booking = require('../models/Booking');

exports.list = async (req, res) => {
  const bookings = await Booking.find().limit(50).lean();
  res.json(bookings);
};

exports.create = async (req, res) => {
  try {
    const doc = await Booking.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
