import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please add an excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    date: {
      type: String,
      required: [true, 'Please add a date'],
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

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
