import INewsDTO from '../../dto/INewsDTO';
import { Result } from '../../core/logic/Result';

export default interface INewsService {
  getTop10News(): Promise<Result<INewsDTO[]>>
}