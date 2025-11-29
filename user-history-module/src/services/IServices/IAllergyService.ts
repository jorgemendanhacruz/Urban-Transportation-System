import { Result } from "../../core/logic/Result";
import IAllergyDTO from "../../dto/IAllergyDTO";

export default interface IAllergyService {
  getAllergies(): Promise<Result<IAllergyDTO[]>>;
  getAllergyById(id: string): Promise<Result<IAllergyDTO>>;
  createAllergy(allergyDTO: IAllergyDTO): Promise<Result<IAllergyDTO>>;
  updateAllergy(id: string, allergyDTO: Partial<IAllergyDTO>): Promise<Result<IAllergyDTO>>;
  deleteAllergy(id: string): Promise<Result<void>>;
}
