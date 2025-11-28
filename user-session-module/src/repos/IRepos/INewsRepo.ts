import { News } from '../../domain/news';
import { Repo } from '../../core/infra/Repo';

export default interface IWeatherRepo extends Repo<News>{
}