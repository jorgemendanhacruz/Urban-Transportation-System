import { IAllergyPersistence } from '../../dataschema/IAllergyPersistence';

export default interface IAllergyRepo {
  getAll(): Promise<IAllergyPersistence[]>;
  getById(id: string): Promise<IAllergyPersistence | null>;
  create(allergy: IAllergyPersistence): Promise<IAllergyPersistence>;
  update(id: string, allergy: Partial<IAllergyPersistence>): Promise<IAllergyPersistence | null>;
  delete(id: string): Promise<void>;
}
