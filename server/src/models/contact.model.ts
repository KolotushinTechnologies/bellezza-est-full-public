import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  phone: string;
  instagram: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
    },
    instagram: {
      type: String,
      required: [true, 'Please add an Instagram handle'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContact>('Contact', ContactSchema);
