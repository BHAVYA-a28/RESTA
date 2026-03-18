import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular?: boolean;
  dietary?: 'Veg' | 'Non-Veg' | 'None';
}

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    dietary: { type: String, enum: ['Veg', 'Non-Veg', 'None'], default: 'None' },
  },
  { timestamps: true }
);

export const Menu: Model<IMenu> =
  mongoose.models.Menu || mongoose.model<IMenu>('Menu', menuSchema);
