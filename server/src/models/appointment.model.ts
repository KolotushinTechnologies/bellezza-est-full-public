import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  client: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  date: Date;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Please add a client'],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Please add a service'],
    },
    date: {
      type: Date,
      required: [true, 'Please add an appointment date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please add a start time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please add a valid time in HH:MM format'],
    },
    endTime: {
      type: String,
      required: [true, 'Please add an end time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please add a valid time in HH:MM format'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create compound index for date and time to prevent double booking
AppointmentSchema.index({ date: 1, startTime: 1, status: 1 });

// Create index for client to quickly find all appointments for a client
AppointmentSchema.index({ client: 1, date: 1 });

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
