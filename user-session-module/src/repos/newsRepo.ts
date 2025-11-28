import { Service, Inject } from "typedi";
import { Repository, RedisConnection } from 'redis-om';
import { News } from '../domain/news';
import INewsRepo from './IRepos/INewsRepo';
import newsSchema from '../persistence/schemas/newsSchema';
import { NewsMap } from '../mappers/newsMap';

@Service()
export default class NewsRepo implements INewsRepo {

  private readonly repo: Repository;

  constructor(@Inject("redis.client") private client: RedisConnection) {
    this.repo = new Repository(newsSchema, client);
    this.repo.createIndex().catch(err => {
      if (!err.message.includes('Index already exists')) {
        console.error(err);
      }
    });
  }

  async getAll(): Promise<News[]> {
    const news = await this.repo.search().returnAll();
    const domainNews = await Promise.all(
      news.map(async (rawHeadline) =>
        NewsMap.toDomain(rawHeadline)
      )
    );
    return domainNews.filter((headline) => headline !== null);
  }

  async create(headline: News): Promise<News> {
    const persistenceHeadline = NewsMap.toPersistence(headline);
    const id = headline.title.toUpperCase();
    const createdHeadline = await this.repo.save(id, persistenceHeadline);
    await this.repo.expire(id, 600);
    return NewsMap.toDomain(createdHeadline);
  }
}