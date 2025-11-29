import { Service, Inject } from 'typedi';

import { Document, Model } from "mongoose";
import { IAllergyPersistence } from '../dataschema/IAllergyPersistence';

import IAllergyRepo from '../services/IRepos/IAllergyRepo';
import Allergy from '../persistence/schemas/allergySchema';


@Service()
export default class AllergyRepo implements IAllergyRepo {
  private models: any;

  constructor(
    @Inject('allergySchema') private allergySchema: Model<IAllergyPersistence & Document>,
  ) {}

  public async getAll(): Promise<IAllergyPersistence[]> {
    const allergies = await Allergy.find();
    return allergies.map((allergy) => ({
      _id: allergy._id.toString(),
      allergyCode: allergy.allergyCode,
      designation: allergy.designation,
      description: allergy.description,
    }));
  }

  public async getById(id: string): Promise<IAllergyPersistence | null> {
    const allergy = await Allergy.findById(id);
    if (!allergy) return null;
    return {
      _id: allergy._id.toString(),
      allergyCode: allergy.allergyCode,
      designation: allergy.designation,
      description: allergy.description,
    };
  }

  public async create(allergy: IAllergyPersistence): Promise<IAllergyPersistence> {
    const createdAllergy = await Allergy.create(allergy);
    return {
      _id: createdAllergy._id.toString(),
      allergyCode: createdAllergy.allergyCode,
      designation: createdAllergy.designation,
      description: createdAllergy.description,
    };
  }

  public async update(id: string, allergy: Partial<IAllergyPersistence>): Promise<IAllergyPersistence | null> {
    const updatedAllergy = await Allergy.findByIdAndUpdate(id, allergy, { new: true });
    if (!updatedAllergy) return null;

    return {
      _id: updatedAllergy._id.toString(),
      allergyCode: updatedAllergy.allergyCode,
      designation: updatedAllergy.designation,
      description: updatedAllergy.description,
    };
  }

  public async delete(id: string): Promise<void> {
    const deletedAllergy = await Allergy.findByIdAndDelete(id);
    if (!deletedAllergy) {
      throw new Error('Allergy not found');
    }
  }

}
