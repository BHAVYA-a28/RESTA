const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    dietary: { type: String, enum: ['Veg', 'Non-Veg', 'None'], default: 'Veg' },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
