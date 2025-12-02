import { Service, Inject } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IUserTripHistoryService from './IServices/IUserTripHistoryService';
import IUserTripHistoryRepo from './IRepos/IUserTripHistoryRepo';
import IUserTripHistoryDTO from '../dto/IUserTripHistoryDTO';
import { UserTripHistoryMap } from '../mappers/UserTripHistoryMap';


@Service()
export default class UserTripHistoryService implements IUserTripHistoryService {
  constructor(
    @Inject(config.repos.userTripHistory.name) private userTripHistoryRepo: IUserTripHistoryRepo
  ) { }

  public async getAllUserTripHistories(): Promise<Result<IUserTripHistoryDTO[]>> {
    try {
      const userTripHistories = await this.userTripHistoryRepo.findAll();

      //console.log(favorites)

      if (!userTripHistories || userTripHistories.length === 0) {
        return Result.ok<IUserTripHistoryDTO[]>([]);
      }

      const notificationDtos = userTripHistories.map(uth => UserTripHistoryMap.toDTO(uth) as IUserTripHistoryDTO);

      return Result.ok<IUserTripHistoryDTO[]>(notificationDtos);
    } catch (e) {
      throw e;
    }
  }

  public async getUserTripHistory(userId: string): Promise<Result<IUserTripHistoryDTO>> {

    try {
      const userTripHistory = await this.userTripHistoryRepo.findByUserId(userId);

      if (userTripHistory === null) {
        return Result.fail<IUserTripHistoryDTO>("User Trip History not found");
      }
      else {
        const userTripHistoryDtoResult = UserTripHistoryMap.toDTO(userTripHistory) as IUserTripHistoryDTO;
        return Result.ok<IUserTripHistoryDTO>(userTripHistoryDtoResult)
      }
    } catch (e) {
      throw e;
    }
  }


}
