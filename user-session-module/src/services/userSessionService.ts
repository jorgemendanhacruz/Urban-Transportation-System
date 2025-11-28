import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import IUserSessionDTO from '../dto/IUserSessionDTO';
import IUserSessionService from './IServices/IUserSessionService';
import IUserSessionRepo from '../repos/IRepos/IUserSessionRepo';
import { UserSessionMap } from '../mappers/userSessionMap';
import config from '../config/config';
import Logger from '../loaders/logger';

@Service()
export default class UserSessionService implements IUserSessionService {


  constructor(
    @Inject(config.repos.userSession.name) private userSessionRepo: IUserSessionRepo,
  ) {}


  public async getAllUserSessions(): Promise<Result<IUserSessionDTO[]>> {
    try {
      const userSessions = await this.userSessionRepo.getAll();
      return Result.ok(userSessions.map(UserSessionMap.toDTO));
    } catch (error) {
      return Result.fail('Failed to fetch weathers');
    }
  }
  public async getUSerSession(userId: string): Promise<Result<IUserSessionDTO>> {
    const userSession = await this.userSessionRepo.getByUser(userId);
    return Result.ok(UserSessionMap.toDTO(userSession));

  }
}
