import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from '../core/logic/Guard';
import { Result } from "../core/logic/Result";



interface WeatherProps {
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

export class Weather extends ValueObject<WeatherProps> {

    get city(): string{
        return this.props.city;
    }

    get country(): string{
        return this.props.country;
    }

    get lat(): number{
        return this.props.lat;
    }

    get lon(): number{
        return this.props.lon;
    }

    get sunrise(): number{
        return this.props.sunrise;
    }

    get sunset(): number{
        return this.props.sunset;
    }

    get temperature(): number{
        return this.props.temperature;
    }

    get feelsLikeTemperature(): number{
        return this.props.feelsLikeTemperature;
    }

    get description(): string{
        return this.props.description;
    }

    get timestamp(): number{
        return this.props.timestamp;
    }

    
    private constructor (props: WeatherProps){
        super(props);
    }
    

    public static create(props: WeatherProps): Result<Weather>{

        const guardedProps = [
            {argument: props.city, argumentName: 'city'},
            {argument: props.country, argumentName: 'country'},
            {argument: props.lat, argumentName: 'lat'},
            {argument: props.lon, argumentName: 'lon'},
            {argument: props.sunrise, argumentName: 'sunrise'},
            {argument: props.sunset, argumentName: 'sunset'},
            {argument: props.temperature, argumentName: 'temperature'},
            {argument: props.feelsLikeTemperature, argumentName: 'feelsLikeTemperature'},
            {argument: props.description, argumentName: 'description'},
            {argument: props.timestamp, argumentName: 'timestamp'},
        ]
        
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<Weather>(guardResult.message);
        }

        props.city = props.city.toUpperCase();
        return Result.ok<Weather>(new Weather(props));
    }
}