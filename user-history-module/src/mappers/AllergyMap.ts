import IAllergyDTO from '../dto/IAllergyDTO';
import { IAllergyPersistence } from '../dataschema/IAllergyPersistence';

export default class AllergyMap{
  public static toDTO(allergy: IAllergyPersistence): IAllergyDTO & { id: string }{
    return {
      id: allergy._id.toString(),
      allergyCode: allergy.allergyCode,
      designation: allergy.designation,
      description: allergy.description,
    };
  }

  public static toPersistence(allergyDTO: IAllergyDTO): IAllergyPersistence {
    return {
      allergyCode: allergyDTO.allergyCode,
      designation: allergyDTO.designation,
      description: allergyDTO.description,
    } as IAllergyPersistence;
  }
}
