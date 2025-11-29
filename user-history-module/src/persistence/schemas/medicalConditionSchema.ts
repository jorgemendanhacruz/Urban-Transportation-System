import { Schema, model, Document } from 'mongoose';
import { IMedicalConditionPersistence } from '../../dataschema/IMedicalConditionPersistence';
import { MedicalCondition } from '../../domain/medicalCondition';

const medicalConditionSchema = new Schema<IMedicalConditionPersistence>({
  medicalConditionCode: {
    type: String,
    required: true,
    unique: true
  },

  designation:
  { type: String,
    required: true
  },

  description: {
    type: String
  },

  symptoms: {
    type: String
  },

}, { timestamps: true });

export default model<IMedicalConditionPersistence & Document>('MedicalCondition', medicalConditionSchema);

