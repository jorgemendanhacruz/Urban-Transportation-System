import { Entity } from 'redis-om';

export default interface IWeatherPersistence extends Entity {
  city: string;
  country: string;
  lat: string;
  lon: string;
  sunrise: string;
  sunset: string;
  temperature: string;
  feelsLikeTemperature: string;
  description: string;
  timestamp: string;
}