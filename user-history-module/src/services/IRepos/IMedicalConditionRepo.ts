import { IMedicalConditionPersistence } from '../../dataschema/IMedicalConditionPersistence';

export default interface IMedicalConditionRepo {
  getAll(): Promise<IMedicalConditionPersistence[]>;
  getById(id: string): Promise<IMedicalConditionPersistence | null>;
  create(medicalCondition: IMedicalConditionPersistence): Promise<IMedicalConditionPersistence>;
  update(id: string, medicalCondition: Partial<IMedicalConditionPersistence>): Promise<IMedicalConditionPersistence | null>;
  delete(id: string): Promise<void>;
}
