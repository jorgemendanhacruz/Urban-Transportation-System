import IMedicalConditionDTO from '../dto/IMedicalConditionDTO';
import { IMedicalConditionPersistence } from '../dataschema/IMedicalConditionPersistence';
import { MedicalCondition } from '../domain/medicalCondition';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export default class MedicalConditionMap{
  public static toDTO(medicalCondition: IMedicalConditionPersistence): IMedicalConditionDTO & { id: string }{
    return {
      id: medicalCondition._id.toString(),
      medicalConditionCode: medicalCondition.medicalConditionCode,
      designation: medicalCondition.designation,
      description: medicalCondition.description,
      symptoms: medicalCondition.symptoms,
    };
  }
   public static async toDomain (raw: any): Promise<MedicalCondition> {
      const medicalConditionOrError = MedicalCondition.create({
        medicalConditionCode: raw.medicalConditionCode,
        designation: raw.designation,
        description: raw.description,
        symptoms: raw.symptoms,
      }, new UniqueEntityID(raw.medicalConditionId))

      medicalConditionOrError.isFailure ? console.log(medicalConditionOrError.error) : '';

      return medicalConditionOrError.isSuccess ? medicalConditionOrError.getValue() : null;
    }


  public static toPersistence(medicalConditionDTO: IMedicalConditionDTO): IMedicalConditionPersistence {
    return {
      medicalConditionCode: medicalConditionDTO.medicalConditionCode,
      designation: medicalConditionDTO.designation,
      description: medicalConditionDTO.description,
      symptoms: medicalConditionDTO.symptoms,
    } as IMedicalConditionPersistence;
  }
}
