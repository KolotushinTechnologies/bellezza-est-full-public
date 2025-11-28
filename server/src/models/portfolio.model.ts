import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  type: string;
  src: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    type: {
      type: String,
      required: true,
      default: 'image',
    },
    src: {
      type: String,
      required: [true, 'Please add an image source'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
