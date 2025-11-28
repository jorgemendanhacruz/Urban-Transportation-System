import { Weather } from '../../domain/weather';
import { Repo } from '../../core/infra/Repo';

export default interface IWeatherRepo extends Repo<Weather>{
  getByCoords(lat: string, lon: string): Promise<Weather | null>;
  update(city: string, weather: Partial<Weather>): Promise<Weather | null>;
}