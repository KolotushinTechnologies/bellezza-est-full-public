import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    image: {
      type: String,
      required: [true, 'Please add an image'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>('Service', ServiceSchema);
