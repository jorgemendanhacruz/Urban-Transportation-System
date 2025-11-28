import { Request, Response, NextFunction } from "express";
import { Inject, Service } from 'typedi';
import config from '../config/config'
import { Result } from "../core/logic/Result";

import IWeatherController from "./IControllers/IWeatherController";
import IWeatherService from "../services/IServices/IWeatherService";
import IWeatherDTO from "../dto/IWeatherDTO";

@Service()
export default class WeatherController implements IWeatherController {
    
    constructor(
        @Inject(config.services.weather.name) private weatherService: IWeatherService
    ) { }

    public async getAllWeathers(req: Request, res: Response, next: NextFunction) {
        try {

            const result = await this.weatherService.getAllWeathers();

            if (result.isFailure) {
                return res.status(400).json(result.error);
            }


            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }

    public async getWeatherByCity(req: Request, res: Response, next: NextFunction) {
        try {
            const { city } = req.params;
            const result = await this.weatherService.getWeather(city);

            if (result.isFailure) {
                return res.status(400).json(result.error);
            }

            return res.status(200).json(result.getValue());
        }
        catch (error) {
            return next(error);
        }
    }

    public async createWeather(req: Request, res: Response, next: NextFunction) {
        try {
            const weatherOrError = await this.weatherService.createWeather(req.body as IWeatherDTO) as Result<IWeatherDTO>;

            if (weatherOrError.isFailure) {
                return res.status(400).json(weatherOrError.error);
            }

            return res.json(weatherOrError.getValue()).status(201);
        }
        catch (error) {
            return next(error);
        }
    }

    public async updateWeather(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (error) {
            return next(error);
        }
    }

}