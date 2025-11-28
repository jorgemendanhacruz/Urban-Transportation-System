export default interface IWeatherDTO {
    city: string;
    country: string;
    lat: number;
    lon: number;
    sunrise: number;
    sunset: number;
    temperature: number;
    feelsLikeTemperature: number;
    description: string;
    timestamp: number;
}