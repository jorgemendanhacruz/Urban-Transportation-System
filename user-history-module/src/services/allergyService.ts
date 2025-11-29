import { Service, Inject } from 'typedi';
import IAllergyDTO from '../dto/IAllergyDTO';
import IAllergyRepo from '../services/IRepos/IAllergyRepo';
import IAllergyService from './IServices/IAllergyService';
import { Result } from '../core/logic/Result';
import AllergyMap from '../mappers/AllergyMap';

@Service()
export default class AllergyService implements IAllergyService {
  constructor(
    @Inject('AllergyRepo') private allergyRepo: IAllergyRepo
  ) {}

  public async getAllergies(): Promise<Result<(IAllergyDTO & { id: string })[]>> {
    const allergies = await this.allergyRepo.getAll();
    return Result.ok(allergies.map(AllergyMap.toDTO));
  }

  public async getAllergyById(id: string): Promise<Result<IAllergyDTO>> {
    const allergy = await this.allergyRepo.getById(id);
    if (!allergy) {
      return Result.fail('Allergy not found');
    }
    return Result.ok(AllergyMap.toDTO(allergy));
  }

  public async createAllergy(allergyDTO: IAllergyDTO): Promise<Result<IAllergyDTO>> {
    const allergy = AllergyMap.toPersistence(allergyDTO);
    const newAllergy = await this.allergyRepo.create(allergy);
    return Result.ok(AllergyMap.toDTO(newAllergy));
  }

  public async updateAllergy(id: string, allergyDTO: Partial<IAllergyDTO>): Promise<Result<IAllergyDTO>> {
    const updatedAllergy = await this.allergyRepo.update(id, AllergyMap.toPersistence(allergyDTO as IAllergyDTO));
    if (!updatedAllergy) {
      return Result.fail('Allergy not found');
    }
    return Result.ok(AllergyMap.toDTO(updatedAllergy));
  }

  public async deleteAllergy(id: string): Promise<Result<void>> {
    const allergy = await this.allergyRepo.getById(id);
    if (!allergy) {
      return Result.fail('Allergy not found');
    }
    await this.allergyRepo.delete(id);
    return Result.ok();
  }
}
