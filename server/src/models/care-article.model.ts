import mongoose, { Document, Schema } from 'mongoose';

export interface ICareArticle extends Document {
  title: string;
  excerpt: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const CareArticleSchema = new Schema<ICareArticle>(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please add an excerpt'],
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

export default mongoose.model<ICareArticle>('CareArticle', CareArticleSchema);
