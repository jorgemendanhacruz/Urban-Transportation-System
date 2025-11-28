import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import config from "../../config/config"
import IWeatherController from "../../controllers/IControllers/IWeatherController";

const route = Router();

export default (app: Router) => {
    app.use('/weather', route);

    const ctrl = Container.get(config.controllers.weather.name) as IWeatherController;

    route.get(
        '/',
        (req, res, next) => ctrl.getAllWeathers(req, res, next),
    );

    route.get(
        '/:city',
        celebrate({
            params: Joi.object({
                city: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getWeatherByCity(req, res, next),
    );

    route.post(
        '/',
        celebrate({
            body: Joi.object({
                city: Joi.string().required(),
                country: Joi.string().required(),
                lat: Joi.number().optional(),
                lon: Joi.number().required(),
                sunrise: Joi.number().required(),
                sunset: Joi.number().required(),
                temperature: Joi.number().required(),
                feelsLikeTemperature: Joi.number().required(),
                description: Joi.string().required(),
                timestamp: Joi.number().required(),
            }),
        }),
        (req, res, next) => ctrl.createWeather(req, res, next),
    );

    route.put(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                city: Joi.string().required(),
                country: Joi.string().required(),
                lat: Joi.number().optional(),
                lon: Joi.number().required(),
                sunrise: Joi.number().required(),
                sunset: Joi.number().required(),
                temperature: Joi.number().required(),
                feelsLikeTemperature: Joi.number().required(),
                description: Joi.string().required(),
                timestamp: Joi.number().required(),
            }),
        }),
        (req, res, next) => ctrl.updateWeather(req, res, next),
    );
}