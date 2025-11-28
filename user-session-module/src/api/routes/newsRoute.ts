import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import config from "../../config/config"
import INewsController from "../../controllers/IControllers/INewsController";

const route = Router();

export default (app: Router) => {
    app.use('/news', route);

    const ctrl = Container.get(config.controllers.news.name) as INewsController;

    route.get(
        '/top10News',
        (req, res, next) => ctrl.getTop10News(req, res, next),
    );

}