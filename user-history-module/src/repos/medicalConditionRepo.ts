import { Service, Inject } from 'typedi';
import { Document, Model } from "mongoose";
import { IMedicalConditionPersistence } from '../dataschema/IMedicalConditionPersistence';
import IMedicalConditionRepo from '../services/IRepos/IMedicalConditionRepo';
import MedicalCondition from '../persistence/schemas/medicalConditionSchema';


@Service()
export default class medicalConditionRepo implements IMedicalConditionRepo {
  private models: any;

  constructor(
    @Inject('medicalConditionSchema') private medicalConditionSchema: Model<IMedicalConditionPersistence & Document>,
  ) {}

  public async getAll(): Promise<IMedicalConditionPersistence[]> {
    const medicalConditions = await MedicalCondition.find();
    return medicalConditions.map((medicalCondition) => ({
      _id: medicalCondition._id.toString(),
      medicalConditionCode: medicalCondition.medicalConditionCode,
      designation: medicalCondition.designation,
      description: medicalCondition.description,
      symptoms: medicalCondition.symptoms,
    }));
  }

  public async getById(id: string): Promise<IMedicalConditionPersistence | null> {
    const medicalCondition = await MedicalCondition.findById(id);
    if (!medicalCondition) return null;
    return {
      _id: medicalCondition._id.toString(),
      medicalConditionCode: medicalCondition.medicalConditionCode,
      designation: medicalCondition.designation,
      description: medicalCondition.description,
      symptoms: medicalCondition.symptoms,
    };
  }

  public async create(medicalCondition: IMedicalConditionPersistence): Promise<IMedicalConditionPersistence> {
    const createdMedicalCondition = await MedicalCondition.create(medicalCondition);
    return {
      _id: createdMedicalCondition._id.toString(),
      medicalConditionCode: createdMedicalCondition.medicalConditionCode,
      designation: createdMedicalCondition.designation,
      description: createdMedicalCondition.description,
      symptoms: createdMedicalCondition.symptoms,
    };
  }


  /*public async update(id: string, medicalCondition: Partial<IMedicalConditionPersistence>): Promise<IMedicalConditionPersistence | null> {
    const updatedMedicalCondition = await MedicalCondition.findByIdAndUpdate(id, medicalCondition, { new: true });
    if (!updatedMedicalCondition) return null;

    return {
      _id: updatedMedicalCondition._id.toString(),
      medicalConditionCode: updatedMedicalCondition.medicalConditionCode,
      designation: updatedMedicalCondition.designation,
      description: updatedMedicalCondition.description,
      symptoms: updatedMedicalCondition.symptoms,
    };
  }*/
    public async update(
      id: string,
      medicalCondition: Partial<IMedicalConditionPersistence>
    ): Promise<IMedicalConditionPersistence | null> {
      try {
        // Attempt to find and update the medical condition
        const updatedMedicalCondition = await MedicalCondition.findByIdAndUpdate(
          id,
          medicalCondition,
          { new: true, runValidators: true } // Ensure we get the updated doc and run schema validations
        );

        // If not found, return null
        if (!updatedMedicalCondition) {
          return null;
        }

        // Map the result to IMedicalConditionPersistence
        return {
          _id: updatedMedicalCondition._id.toString(),
          medicalConditionCode: updatedMedicalCondition.medicalConditionCode,
          designation: updatedMedicalCondition.designation,
          description: updatedMedicalCondition.description,
          symptoms: updatedMedicalCondition.symptoms,
        };
      } catch (error) {
        // Optionally, log the error or handle it
        console.error(`Error updating medical condition with ID ${id}:`, error);
        throw new Error('Failed to update medical condition');
      }
    }


  public async delete(id: string): Promise<void> {
    const deletedMedicalCondition = await MedicalCondition.findByIdAndDelete(id);
    if (!deletedMedicalCondition) {
      throw new Error('Allergy not found');
    }
  }

}
