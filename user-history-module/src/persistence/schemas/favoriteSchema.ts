import { IFavoritePersistence } from '../../dataschema/IFavoritePersistence';
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFavoritePersistence & mongoose.Document>('Favorite', FavoriteSchema);
