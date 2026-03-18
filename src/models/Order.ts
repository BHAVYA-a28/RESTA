import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: [true, 'Please provide a table number'],
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
  status: {
    type: String,
    enum: ['pending', 'preparing', 'served', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
