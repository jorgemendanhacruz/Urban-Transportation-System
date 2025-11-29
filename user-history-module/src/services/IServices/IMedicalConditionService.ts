import { Result } from "../../core/logic/Result";
import IMedicalConditionDTO from "../../dto/IMedicalConditionDTO";

export default interface IMedicalConditionService {
  getMedicalConditions(): Promise<Result<IMedicalConditionDTO[]>>;
  getMedicalConditionById(id: string): Promise<Result<IMedicalConditionDTO>>;
  createMedicalCondition(medicalConditionDTO: IMedicalConditionDTO): Promise<Result<IMedicalConditionDTO>>;
  updateMedicalCondition(id: string, medicalConditionDTO: Partial<IMedicalConditionDTO>): Promise<Result<IMedicalConditionDTO>>;
  deleteMedicalCondition(id: string): Promise<Result<void>>;
}
