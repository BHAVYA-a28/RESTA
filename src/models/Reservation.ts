import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: string;
  status: string;
}

const reservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
    },
    tableNumber: {
      type: String,
      default: 'Unassigned',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'seated', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Reservation: Model<IReservation> =
  mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', reservationSchema);
