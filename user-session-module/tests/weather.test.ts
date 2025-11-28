// tests/Weather.test.ts
import { Weather } from '../src/domain/weather';
import { Result } from '../src/core/logic/Result';

describe('Weather ValueObject', () => {
  const validProps = {
    city: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278,
    sunrise: 1695800000,
    sunset: 1695840000,
    temperature: 20,
    feelsLikeTemperature: 19,
    description: 'Cloudy',
    timestamp: 1695820000,
  };

  it('should create a Weather object with valid props', () => {
    const props = { ...validProps };
    const result = Weather.create(props);

    expect(result.isSuccess).toBe(true);
    const weather = result.getValue();
    expect(weather).toBeInstanceOf(Weather);
    expect(weather.city).toBe('LONDON'); // city should be uppercase
    expect(weather.country).toBe(validProps.country);
    expect(weather.lat).toBe(validProps.lat);
    expect(weather.lon).toBe(validProps.lon);
  });

  it('should fail if a required property is missing', () => {
    const invalidProps = { ...validProps, city: null }; // missing city
    const result = Weather.create(invalidProps as any);

    expect(result.isSuccess).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error).toContain('city'); // Guard error message mentions city
  });

  it('should have correct getters', () => {
    const result = Weather.create(validProps);
    const weather = result.getValue();

    expect(weather.city).toBe('LONDON');
    expect(weather.country).toBe(validProps.country);
    expect(weather.lat).toBe(validProps.lat);
    expect(weather.lon).toBe(validProps.lon);
    expect(weather.sunrise).toBe(validProps.sunrise);
    expect(weather.sunset).toBe(validProps.sunset);
    expect(weather.temperature).toBe(validProps.temperature);
    expect(weather.feelsLikeTemperature).toBe(validProps.feelsLikeTemperature);
    expect(weather.description).toBe(validProps.description);
    expect(weather.timestamp).toBe(validProps.timestamp);
  });
});
