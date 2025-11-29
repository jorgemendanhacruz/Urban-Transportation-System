import { ObjectId } from 'mongoose';

export interface IMedicalConditionPersistence {
  _id: string | ObjectId;
  medicalConditionCode: string;
  designation: string;
  description?: string;
  symptoms?: string;
}
