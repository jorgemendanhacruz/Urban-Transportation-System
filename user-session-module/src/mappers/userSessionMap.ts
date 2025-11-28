import IWeatherDTO from "../dto/IUserSessionDTO";
import { Mapper } from '../core/infra/Mapper';
import { UserSession } from "../domain/userSession";
import IUserSessionDTO from "../dto/IUserSessionDTO";


export class UserSessionMap extends Mapper<UserSession> {

  public static async toDomain(raw: any): Promise<UserSession> {
    const userSessionOrError = UserSession.create(raw);

    userSessionOrError.isFailure ? console.log(userSessionOrError.error) : '';

    return userSessionOrError.isSuccess ? userSessionOrError.getValue() : null;
  }

  /*public static async fromResponseToDto(response: any): Promise<IWeatherDTO> {
    return {
      city: response.name,
      country: response.sys.country,
      lat: response.coord.lat,
      lon: response.coord.lon,
      sunrise: response.sys.sunrise,
      sunset: response.sys.sunset,
      temperature: response.main.temp,
      feelsLikeTemperature: response.main.feels_like,
      description: response.weather[0].description,
      timestamp: Date.now(),
    };
  }*/

  public static toDTO(userSession: UserSession): IUserSessionDTO {

    return {
      userId: userSession.userId,
      createdAt: userSession.createdAt,
      expiresAt: userSession.expiresAt,
      ipAddress: userSession.ipAddress,
      userAgent: userSession.userAgent,
      lastActivity: userSession.lastActivity
    } as IUserSessionDTO;
  }

  /*public static toPersistence(weather: Weather): IWeatherPersistence {
    return {
      city: weather.city,
      country: weather.country,
      lat: weather.lat.toString(),
      lon: weather.lon.toString(),
      sunrise: weather.sunrise.toString(),
      sunset: weather.sunset.toString(),
      temperature: weather.temperature.toString(),
      feelsLikeTemperature: weather.feelsLikeTemperature.toString(),
      description: weather.description,
      timestamp: weather.timestamp.toString(),
    } as IWeatherPersistence;
  }*/
}