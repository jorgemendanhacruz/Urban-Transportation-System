import { Request, Response, NextFunction } from "express";

export default interface IWeatherController {
    getAllWeathers(req: Request, res: Response, next: NextFunction);
    getWeatherByCity(req: Request, res: Response, next: NextFunction);
    createWeather(req: Request, res: Response, next: NextFunction);
    updateWeather(req: Request, res: Response, next: NextFunction);
}