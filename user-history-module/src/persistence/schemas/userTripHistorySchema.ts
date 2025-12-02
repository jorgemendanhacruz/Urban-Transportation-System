import mongoose from 'mongoose';
import IUserTripHistoryPersistence from '../../dataschema/IUserTripHistoryPersistence';

const UserTripHistorySchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    tripId: { type: String, required: true },
    date: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUserTripHistoryPersistence & mongoose.Document>('UserTripHistory', UserTripHistorySchema, 'UserTripHistory');
