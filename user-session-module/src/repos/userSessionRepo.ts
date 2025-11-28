import { Service, Inject } from "typedi";
import { Repository, RedisConnection } from 'redis-om';
import userSessionSchema from '../persistence/schemas/userSessionSchema';
import { UserSessionMap } from '../mappers/userSessionMap';
import IUserSessionRepo from "./IRepos/IUserSessionRepo";
import { UserSession } from "../domain/userSession";

@Service()
export default class UserSessionRepo implements IUserSessionRepo {

  private readonly repo: Repository;

  constructor(@Inject("redis.client") private client: RedisConnection) {
    this.repo = new Repository(userSessionSchema, client);
    this.repo.createIndex().catch(err => {
      if (!err.message.includes('Index already exists')) {
        console.error(err);
      }
    });
  }

  create(t: UserSession): Promise<UserSession> {
    throw new Error("Method not implemented.");
  }

  getByUser(userId: string): Promise<UserSession | null> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<UserSession[]> {
    const users = await this.repo.search().returnAll();
    const domainUsers = await Promise.all(
      users.map(async (rawUser) =>
        UserSessionMap.toDomain(rawUser)
      )
    );
    return domainUsers.filter((user) => user !== null);
  }

  
}