import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import IUserTripHistoryPersistence from '../dataschema/IUserTripHistoryPersistence';
import IUserTripHistoryRepo from '../services/IRepos/IUserTripHistoryRepo';
import { UserTripHistory } from '../domain/userTripHistory';
import { UserTripHistoryMap } from '../mappers/UserTripHistoryMap';

@Service()
export default class UserTripHistoryRepo implements IUserTripHistoryRepo {
  private models: any;

  constructor(
    @Inject('userTripHistorySchema') private userTripHistorySchema: Model<IUserTripHistoryPersistence & Document>,
  ) { }


  exists(t: UserTripHistory): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: UserTripHistory): Promise<UserTripHistory> {
    throw new Error('Method not implemented.');
  }


  public async findAll(): Promise<UserTripHistory[]> {

    const userTripHistoryRecords = await this.userTripHistorySchema.find();

    if (!userTripHistoryRecords || userTripHistoryRecords.length === 0) {
      return [];
    }

    return userTripHistoryRecords.map((userTripHistory) => UserTripHistoryMap.toDomain(userTripHistory));
  }


  public async findByUserId(userId: string): Promise<UserTripHistory> {
    const query = { userId: userId };
    const userTripHistoryRecord = await this.userTripHistorySchema.findOne(query as FilterQuery<IUserTripHistoryPersistence & Document>);

    if (userTripHistoryRecord != null) {
      return UserTripHistoryMap.toDomain(userTripHistoryRecord);
    }
    else
      return null;
  }
}