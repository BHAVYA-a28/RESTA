import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: false, // Optional for delivery
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    zip: String,
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['dine-in', 'delivery', 'takeaway'],
    default: 'dine-in'
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'served', 'completed', 'cancelled', 'bill_requested', 'out-for-delivery'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
