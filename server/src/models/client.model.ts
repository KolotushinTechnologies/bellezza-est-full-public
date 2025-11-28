import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  name: string;
  phone: string;
  email?: string;
  birthDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    birthDate: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot be more than 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search
ClientSchema.index({ name: 'text', phone: 'text', email: 'text' });

export default mongoose.model<IClient>('Client', ClientSchema);
