import { IFavoritePersistence } from '../../dataschema/IFavoritePersistence';
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },

  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFavoritePersistence & mongoose.Document>('Favorite', FavoriteSchema);
