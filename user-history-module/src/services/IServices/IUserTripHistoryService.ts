import { Result } from "../../core/logic/Result";
import IUserTripHistoryDTO from "../../dto/IUserTripHistoryDTO";

export default interface IUserTripHistoryService  {
  getUserTripHistory(userId: string): Promise<Result<IUserTripHistoryDTO>>;
  getAllUserTripHistories(): Promise<Result<IUserTripHistoryDTO[]>>;
}
