import { Service, Inject } from 'typedi';
import IMedicalConditionDTO from '../dto/IMedicalConditionDTO';
import IMedicalConditionRepo from './IRepos/IMedicalConditionRepo';
import IMedicalConditionService from './IServices/IMedicalConditionService';
import { Result } from '../core/logic/Result';
import MedicalConditionMap from '../mappers/MedicalConditionMap';

@Service()
export default class MedicalConditionService implements IMedicalConditionService {
  constructor(
    @Inject('MedicalConditionRepo') private medicalConditionRepo: IMedicalConditionRepo
  ) {}

  public async getMedicalConditions(): Promise<Result<(IMedicalConditionDTO & { id: string })[]>> {
    const medicalConditions = await this.medicalConditionRepo.getAll();
    return Result.ok(medicalConditions.map(MedicalConditionMap.toDTO));
  }

  public async getMedicalConditionById(id: string): Promise<Result<IMedicalConditionDTO>> {
    const medicalCondition = await this.medicalConditionRepo.getById(id);
    if (!medicalCondition) {
      return Result.fail('MedicalCondition not found');
    }
    return Result.ok(MedicalConditionMap.toDTO(medicalCondition));
  }

  public async createMedicalCondition(medicalConditionDTO: IMedicalConditionDTO): Promise<Result<IMedicalConditionDTO>> {
    const medicalCondition = MedicalConditionMap.toPersistence(medicalConditionDTO);
    const newMedicalCondition = await this.medicalConditionRepo.create(medicalCondition);
    return Result.ok(MedicalConditionMap.toDTO(newMedicalCondition));
  }

  public async updateMedicalCondition(id: string, medicalConditionDTO: Partial<IMedicalConditionDTO>): Promise<Result<IMedicalConditionDTO>> {
    const updatedMedicalCondition = await this.medicalConditionRepo.update(id, MedicalConditionMap.toPersistence(medicalConditionDTO as IMedicalConditionDTO));
    if (!updatedMedicalCondition) {
      return Result.fail('MedicalCondition not found');
    }
    return Result.ok(MedicalConditionMap.toDTO(updatedMedicalCondition));
  }

  public async deleteMedicalCondition(id: string): Promise<Result<void>> {
    const medicalCondition = await this.medicalConditionRepo.getById(id);
    if (!medicalCondition) {
      return Result.fail('MedicalCondition not found');
    }
    await this.medicalConditionRepo.delete(id);
    return Result.ok();
  }
}
