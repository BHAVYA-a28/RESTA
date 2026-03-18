const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
