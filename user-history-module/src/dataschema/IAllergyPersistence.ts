import { ObjectId } from 'mongoose';

export interface IAllergyPersistence {
  _id: string | ObjectId;
  allergyCode: string;
  designation: string;
  description?: string;
}
