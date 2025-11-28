import { Schema } from 'redis-om';
import IWeatherPersistence from '../../datachema/IWeatherPersistence';

const weatherSchema = new Schema<IWeatherPersistence>('weather',
  {
    city: { type: 'string' },
    country: { type: 'string' },
    lat: { type: 'string' },
    lon: { type: 'string' },
    sunrise: { type: 'string' },
    sunset: { type: 'string' },
    temperature: { type: 'string' },
    feelsLikeTemperature: { type: 'string' },
    description: { type: 'string' },
    timestamp: { type: 'string' },
  },
  { dataStructure: 'HASH' ,
  },
);

export default weatherSchema;
