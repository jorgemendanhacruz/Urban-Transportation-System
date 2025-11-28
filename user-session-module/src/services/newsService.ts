import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import config from '../config/config';
import INewsService from './IServices/INewsService';
import INewsDTO from '../dto/INewsDTO';
import INewsRepo from '../repos/IRepos/INewsRepo';
import INewsApiClient from '../externalAPIs/IExternalAPIs/INewsApiClient';
import { NewsMap } from '../mappers/newsMap';

@Service()
export default class NewsService implements INewsService {

  constructor(
    @Inject(config.repos.news.name) private newsRepo: INewsRepo,
    @Inject(config.newsApi.name) private newsApiClient: INewsApiClient,
  ) { }



  public async getTop10News(): Promise<Result<INewsDTO[]>> {
    try {
      const news = await this.newsRepo.getAll();

      //TTL expired and there are no headlines on redis
      if(!news || news.length === 0){

        const topHeadlinesResponse = await this.newsApiClient.getLatest10Headlines();

        const newsDto = await NewsMap.fromResponseToDto(topHeadlinesResponse);

        for(const headline of newsDto){
          await this.newsRepo.create(await NewsMap.toDomain(headline));
        }

        return Result.ok(newsDto);

      }

      return Result.ok(news.map(NewsMap.toDTO));

    } catch (error) {
      return Result.fail('Failed to fetch news');
    }
  }

}
