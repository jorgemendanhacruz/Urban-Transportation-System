import IWeatherDTO from '../../dto/IWeatherDTO';
import { Result } from '../../core/logic/Result';

export default interface IWeatherService {
  getAllWeathers(): Promise<Result<IWeatherDTO[]>>
  getWeather(city: string): Promise<Result<IWeatherDTO>>;
  createWeather(weatherDto: IWeatherDTO): Promise<Result<IWeatherDTO>>;
  updateWeather(city: string, weatherDto: Partial<IWeatherDTO>): Promise<Result<IWeatherDTO>>;
}
