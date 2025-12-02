import { Repo } from "../../core/infra/Repo";
import { UserTripHistory } from "../../domain/userTripHistory";

export default interface IUserTripHistoryRepo extends Repo<UserTripHistory> {
  findByUserId (userId: string): Promise<UserTripHistory>;
  findAll (): Promise<UserTripHistory[]>;
}