import { Schema, model, Document } from 'mongoose';
import { IAllergyPersistence } from '../../dataschema/IAllergyPersistence';

const AllergySchema = new Schema<IAllergyPersistence>({
  allergyCode: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

export default model<IAllergyPersistence & Document>('Allergy', AllergySchema);

