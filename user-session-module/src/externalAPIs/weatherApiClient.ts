import dotenv from "dotenv";
import axios from "axios";
import config from '../config/config'
import { RedisConnection } from 'redis-om';
import IWeatherApiClient from './IExternalAPIs/IWeatherApiClient';
import { Service } from 'typedi';

@Service()
export default class WeatherApiClient implements IWeatherApiClient {
  private readonly url: string;
  private readonly apiKey: string;
  private readonly exclude: string;

  constructor() {
    this.url = config.weatherApi.url;
    this.apiKey = process.env.WEATHER_API_KEY;
    this.exclude = 'hourly,daily';
  }

  public async getWeather(lat: string, lon: string) {
    try {
      const response = await axios.get(
        this.url +
          `lat=${lat}&lon=${lon}&exclude=${this.exclude}&appid=${this.apiKey}`,
      );
      //console.log('Weather Data:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching weather:',
        error.response?.data || error.message,
      );
    }
  }
}