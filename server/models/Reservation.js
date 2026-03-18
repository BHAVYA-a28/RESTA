const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
