import mongoose, { Document, Schema } from 'mongoose';

export interface ICareArticle extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  sidebarTips: string[];
  sidebarTimeText: string;
  createdAt: Date;
  updatedAt: Date;
}

const CareArticleSchema = new Schema<ICareArticle>(
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
    image: {
      type: String,
      required: [true, 'Please add an image'],
    },
    sidebarTips: {
      type: [String],
      default: ['Регулярность — ключ к успеху', 'Подбирайте средства по типу кожи', 'Не забывайте о защите от солнца'],
    },
    sidebarTimeText: {
      type: String,
      default: 'Уделяйте уходу за кожей минимум 10-15 минут утром и вечером для достижения наилучших результатов.',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICareArticle>('CareArticle', CareArticleSchema);
