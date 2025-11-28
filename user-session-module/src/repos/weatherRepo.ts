import { Service, Inject } from "typedi";
import { Repository, RedisConnection } from 'redis-om';
import { Weather } from '../domain/weather';
import IWeatherRepo from './IRepos/IWeatherRepo';
import weatherSchema from '../persistence/schemas/weatherSchema';
import { WeatherMap } from '../mappers/weatherMap';

@Service()
export default class WeatherRepo implements IWeatherRepo {

  private readonly repo: Repository;

  constructor(@Inject("redis.client") private client: RedisConnection) {
    this.repo = new Repository(weatherSchema, client);
    this.repo.createIndex().catch(err => {
      if (!err.message.includes('Index already exists')) {
        console.error(err);
      }
    });
  }

  async getAll(): Promise<Weather[]> {
    const weathers = await this.repo.search().returnAll();
    const domainWeathers = await Promise.all(
      weathers.map(async (rawWeather) =>
        WeatherMap.toDomain(rawWeather)
      )
    );
    return domainWeathers.filter((weather) => weather !== null);
  }

  async create(weather: Weather): Promise<Weather> {
    const persisntenceWeather = WeatherMap.toPersistence(weather);
    const id = weather.city.toUpperCase();
    const createdWeather = await this.repo.save(id, persisntenceWeather);
    await this.repo.expire(id, 600);
    return WeatherMap.toDomain(createdWeather);
  }

  async getByCoords(lat: string, lon: string): Promise<Weather | null> {

    const found = await this.repo.search()
      .where('lat').equals(lat)
      .and('lon').equals(lon)
      .returnFirst();
    return found ? WeatherMap.toDomain(found) : null;
  }

  async update(city: string, weather: Partial<Weather>): Promise<Weather> {
    city = city.toUpperCase();

    const found = await this.repo.search()
      .where('city')
      .equals(city)
      .returnFirst();

    if (!found) {
      throw new Error(`Weather for city ${city} not found.`);
    }

    const updatedPersistence = { ...found, ...WeatherMap.toPersistence(weather as Weather) };
    const saved = await this.repo.save(updatedPersistence);
    return WeatherMap.toDomain(saved);
  }
}