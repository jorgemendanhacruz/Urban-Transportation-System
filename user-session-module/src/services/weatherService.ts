import { Service, Inject } from 'typedi';
import { Result } from '../core/logic/Result';
import IWeatherDTO from '../dto/IWeatherDTO';
import IWeatherService from './IServices/IWeatherService';
import IWeatherRepo from '../repos/IRepos/IWeatherRepo';
import { WeatherMap } from '../mappers/weatherMap';
import nodeGeocoder from 'node-geocoder';
import config from '../config/config';
import Logger from '../loaders/logger';
import IWeatherApiClient from '../externalAPIs/IExternalAPIs/IWeatherApiClient';

@Service()
export default class WeatherService implements IWeatherService {

  private readonly geocoder: any;

  constructor(
    @Inject(config.repos.weather.name) private weatherRepo: IWeatherRepo,
    @Inject(config.weatherApi.name) private weatherApiClient: IWeatherApiClient,
  ) {
    this.geocoder = nodeGeocoder({
      provider: 'openstreetmap',
    });
  }

  public async getAllWeathers(): Promise<Result<IWeatherDTO[]>> {
    try {
      const weathers = await this.weatherRepo.getAll();
      return Result.ok(weathers.map(WeatherMap.toDTO));
    } catch (error) {
      return Result.fail('Failed to fetch weathers');
    }
  }

  public async getWeather(city: string): Promise<Result<IWeatherDTO>> {
    //Search for the city on REDIS
    const res = await this.geocoder.geocode(city);
    const lat = parseFloat(res[0].latitude.toFixed(4)).toString();
    const lon = parseFloat(res[0].longitude.toFixed(4)).toString();

    const weather = await this.weatherRepo.getByCoords(lat, lon);

    if (!weather) {
      const weatherData = await this.weatherApiClient.getWeather(lat.toString(), lon.toString());
      const dto = await WeatherMap.fromResponseToDto(weatherData);
      const weather = await WeatherMap.toDomain(dto);

      const createdWeather = await this.weatherRepo.create(weather);
      Logger.info(createdWeather.city + " - " + createdWeather.country + " added to cache ");

      return Result.ok(WeatherMap.toDTO(createdWeather));
    }

    return Result.ok(WeatherMap.toDTO(weather));
  }



  public async createWeather(weatherDto: IWeatherDTO): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const createdWeather = await this.weatherRepo.create(weather);
    return Result.ok(WeatherMap.toDTO(createdWeather));
  }

  public async updateWeather(
    city: string,
    weatherDto: Partial<IWeatherDTO>,
  ): Promise<Result<IWeatherDTO>> {
    const weather = await WeatherMap.toDomain(weatherDto);
    const updatedWeather = await this.weatherRepo.update(city, weather);

    if (!updatedWeather) {
      return Result.fail('Weather not found');
    }

    return Result.ok(WeatherMap.toDTO(updatedWeather));
  }
}
