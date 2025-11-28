import IUserSessionDTO from '../../dto/IUserSessionDTO';
import { Result } from '../../core/logic/Result';

export default interface IUserSessionService {
  getAllUserSessions(): Promise<Result<IUserSessionDTO[]>>
  getUSerSession(userId: string): Promise<Result<IUserSessionDTO>>;
}
