import { INotificationPersistence } from '../../dataschema/INotificationPersistence';
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<INotificationPersistence & mongoose.Document>('Notification', NotificationSchema, 'Notification');
