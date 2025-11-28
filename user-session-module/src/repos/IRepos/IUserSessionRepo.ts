import { UserSession } from '../../domain/userSession';
import { Repo } from '../../core/infra/Repo';

export default interface IUserSessionRepo extends Repo<UserSession>{
  getByUser(userId: string): Promise<UserSession | null>;
  getAll(): Promise<UserSession[]>
}