export default interface IWeatherApiClient {
  getWeather(lat: string, lon: string): Promise<any>;
}